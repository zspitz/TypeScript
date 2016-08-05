import * as tsi from "typescript";

export abstract class CodegenProvider implements tsi.CodegenProvider {
    private static readonly ["extension-kind"]: "codegen" = "codegen";
    protected ts: typeof tsi;
    protected args: any;
    protected getCommonSourceDirectory: () => string;
    /**
     * NOTE: These compiler options have not yet been verified, so may produce diagnostic messages
     */
    protected getCurrentDirectory: () => string;
    /**
     * addSourceFile causes the file to be added to the program,
     * resulting in processRootFile to be called on the provided SourceFile
     */
    protected addSourceFile: (file: tsi.SourceFile) => void;
    constructor(context: {
            ts: typeof tsi;
            args: any;
            getCommonSourceDirectory: () => string;
            getCurrentDirectory: () => string;
            getCompilerOptions: () => tsi.CompilerOptions;
            addSourceFile: (file: tsi.SourceFile) => void;
        }) {
        this.ts = context.ts;
        this.args = context.args;
        this.getCommonSourceDirectory = context.getCommonSourceDirectory;
        this.getCurrentDirectory = context.getCurrentDirectory;
        this.addSourceFile = context.addSourceFile;
    }
}