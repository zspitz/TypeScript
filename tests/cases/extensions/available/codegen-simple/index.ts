import {CodegenProvider} from "extension-api";
import {SourceFile, Program, ImportDeclaration, StringLiteral} from "typescript";

export default class extends CodegenProvider {
    constructor(context) { super(context); }
    sourceFileFound(file: SourceFile) {
        const firstStatement = file.statements[0];
        if (firstStatement && firstStatement.kind === this.ts.SyntaxKind.ImportDeclaration) {
            const specifier = (firstStatement as ImportDeclaration).moduleSpecifier;
            if (specifier && specifier.kind === this.ts.SyntaxKind.StringLiteral && (specifier as StringLiteral).text === "./foo") {
                this.addSourceFile(this.ts.createSourceFile("foo.ts", "export defaut 42;", this.ts.ScriptTarget.ES3));
            }
        }
    }
    processingComplete(program: Program) {
        const file = program.getSourceFile("foo.ts");
        if (!file) {
            throw new Error("Custom file not found!");
        }
    }
}