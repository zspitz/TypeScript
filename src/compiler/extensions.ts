namespace ts {

    export interface BaseProviderStatic {
        readonly ["extension-kind"]: ExtensionKind;
    }

    export interface CodegenProviderStatic extends BaseProviderStatic {
        readonly ["extension-kind"]: "codegen";
        new (context: {
            ts: typeof ts,
            args: any,
            getCommonSourceDirectory: () => string,
            getCurrentDirectory: () => string,
            /**
             * NOTE: These compiler options have not yet been verified, so may produce diagnostic messages
             */
            getCompilerOptions: () => CompilerOptions,
            /**
             * addSourceFile causes the file to be added to the program,
             * resulting in processRootFile to be called on the provided SourceFile
             */
            addSourceFile: (file: SourceFile) => void
        }): CodegenProvider
    }

    export interface CodegenProvider {
        /**
         * Called each time a file is added to the filesByName set in a program
         *  - should trigger when a generated file is added, this way your
         *    generated code can cause code to generate
         */
        sourceFileFound?(file: SourceFile): void;
        /**
         * Called when all processing is complete and the program is about to be returned,
         * giving you the opportunity to finalize your emitted set of generated files
         */
        processingComplete?(program: Program): void; 
    }

    export namespace ExtensionKind {
        export type Codegen = "codegen";
        export const Codegen: "codegen" = "codegen";
    }
    export type ExtensionKind = ExtensionKind.Codegen;

    export interface ExtensionCollectionMap {
        "codegen"?: CodegenExtension[];
        [index: string]: Extension[] | undefined;
    }

    export interface ExtensionBase {
        name: string;
        args: {};
        kind: ExtensionKind;
        // Include a default case which just puts the extension unchecked onto the base extension
        // This can allow language service extensions to query for custom extension kinds
        extension: {};
    }

    export interface CodegenExtension extends ExtensionBase {
        kind: ExtensionKind.Codegen;
        extension: CodegenProviderStatic;
    }

    export type Extension = ExtensionBase | CodegenExtension;

    export interface ExtensionCache {
        getCompilerExtensions(): ExtensionCollectionMap;
        getExtensionLoadingDiagnostics(): Diagnostic[];
    }

    export interface ExtensionHost extends ModuleResolutionHost {
        loadExtension?(name: string): any;
        resolveModuleNames?(moduleNames: string[], containingFile: string, loadJs?: boolean): ResolvedModule[];
    }

    export interface Program {
        /**
         * Gets a map of loaded compiler extensions
         */
        getCompilerExtensions(): ExtensionCollectionMap;

        /**
         * Gets only diagnostics reported while loading extensions
         */
        getExtensionLoadingDiagnostics(): Diagnostic[];
    }

    /* @internal */
    export interface TypeCheckerHost {
        getCompilerExtensions(): ExtensionCollectionMap;
    }

    function getExtensionRootName(qualifiedName: string) {
        return qualifiedName.substring(0, qualifiedName.indexOf("[")) || qualifiedName;
    }

    function createTaskName(qualifiedName: string, task: string) {
        return `${task}|${qualifiedName}`;
    }

    function startProfile(enabled: boolean, key: string) {
        if (!enabled) return;
        performance.mark(`start|${key}`);
    }

    function completeProfile(enabled: boolean, key: string, bucket: string) {
        if (!enabled) return;
        performance.measure(bucket, `start|${key}`);
    }

    export function startExtensionProfile(enabled: boolean, qualifiedName: string, task: string) {
        if (!enabled) return;
        const longTask = createTaskName(qualifiedName, task);
        startProfile(/*enabled*/true, longTask);
    }

    export function completeExtensionProfile(enabled: boolean, qualifiedName: string, task: string) {
        if (!enabled) return;
        const longTask = createTaskName(qualifiedName, task);
        completeProfile(/*enabled*/true, longTask, getExtensionRootName(qualifiedName));
    }

    function verifyType(thing: any, type: string, diagnostics: Diagnostic[], extName: string, extMember: string, extKind: string) {
        if (typeof thing !== type) {
            diagnostics.push(createCompilerDiagnostic(
                Diagnostics.Extension_0_exported_member_1_has_extension_kind_2_but_was_type_3_when_type_4_was_expected,
                extName,
                extMember,
                extKind,
                typeof thing,
                type
            ));
            return false;
        }
        return true;
    }

    /**
     * Holds validation methods run on extensions upon import. Returns true on validation success, or false on validation fail
     */
    const extensionValidators: MapLike<(res: {name: string, result: any, error: any}, key: string, potentialExtension: any, diagnostics: Diagnostic[]) => boolean> = {
        [ExtensionKind.Codegen]: (res, key, potentialExtension, diagnostics) => {
            return verifyType(potentialExtension, "function", diagnostics, res.name, key, "codegen");
        }
    }

    export function createExtensionCache(options: CompilerOptions, host: ExtensionHost, resolvedExtensionNames?: Map<string>): ExtensionCache {

        const diagnostics: Diagnostic[] = [];
        const extOptions = options.extensions;
        const extensionNames = (extOptions instanceof Array) ? extOptions : extOptions ? Object.keys(extOptions) : [];
        // Eagerly evaluate extension paths, but lazily execute their contents
        resolvedExtensionNames = resolvedExtensionNames || resolveExtensionNames();
        let extensions: ExtensionCollectionMap;

        const cache: ExtensionCache = {
            getCompilerExtensions: () => {
                if (!extensions) {
                    extensions = collectCompilerExtensions();
                }
                return extensions;
            },
            getExtensionLoadingDiagnostics: () => {
                // To get extension loading diagnostics, we need to make sure we've actually loaded them
                cache.getCompilerExtensions();
                return diagnostics;
            },
        };
        return cache;

        // Defer to the host's `resolveModuleName` method if it has it, otherwise use it as a ModuleResolutionHost.
        function resolveModuleName(name: string, fromLocation: string) {
            if (host.resolveModuleNames) {
                const results = host.resolveModuleNames([name], fromLocation, /*loadJs*/true);
                return results && results[0];
            }
            else {
                return ts.resolveModuleName(name, fromLocation, options, host, /*loadJs*/true).resolvedModule;
            }
        }

        function resolveExtensionNames(): Map<string> {
            const basePath = options.configFilePath || combinePaths(host.getCurrentDirectory ? host.getCurrentDirectory() : "", "tsconfig.json");
            const extMap = createMap<string>();
            forEach(extensionNames, name => {
                const resolved = resolveModuleName(name, basePath);
                if (resolved) {
                    extMap[name] = resolved.resolvedFileName;
                }
            });
            return extMap;
        }

        function collectCompilerExtensions(): ExtensionCollectionMap {
            const profilingEnabled = options.extendedDiagnostics;
            const extensionLoadResults = map(extensionNames, (name) => {
                const resolved = resolvedExtensionNames[name];
                let result: any;
                let error: any;
                if (!resolved) {
                    error = new Error(`Host could not locate extension '${name}'.`);
                }
                if (resolved && host.loadExtension) {
                    try {
                        startProfile(profilingEnabled, name);
                        result = host.loadExtension(resolved);
                        completeProfile(profilingEnabled, name, name);
                    }
                    catch (e) {
                        error = e;
                    }
                }
                else if (!host.loadExtension) {
                    error = new Error("Extension loading not implemented in host!");
                }
                if (error) {
                    diagnostics.push(createCompilerDiagnostic(Diagnostics.Extension_loading_failed_with_error_0, error));
                }
                return { name, result, error };
            });
            const successfulExtensionLoadResults = filter(extensionLoadResults, res => !res.error);
            const preparedExtensionObjects = map(successfulExtensionLoadResults, res => {
                if (!res.result) {
                    return [];
                }
                const aggregate: Extension[] = [];
                forEach(Object.keys(res.result), key => {
                    const potentialExtension = res.result[key];
                    if (!potentialExtension) {
                        return; // Avoid errors on explicitly exported null/undefined (why would someone do that, though?)
                    }
                    const annotatedKind = potentialExtension["extension-kind"];
                    if (typeof annotatedKind !== "string") {
                        return;
                    }
                    const ext: ExtensionBase = {
                        name: key !== "default" ? `${res.name}[${key}]` : res.name,
                        args: extensionNames === extOptions ? undefined : (extOptions as MapLike<any>)[res.name],
                        kind: annotatedKind as ExtensionKind,
                        extension: potentialExtension
                    };
                    if (extensionValidators[ext.kind]) {
                        const validated = extensionValidators[ext.kind](res, key, potentialExtension, diagnostics);
                        if (!validated) return aggregate;
                    }
                    aggregate.push(ext);
                });
                return aggregate;
            });
            return groupBy(flatten(preparedExtensionObjects), elem => elem.kind) || {};
        }
    }
}