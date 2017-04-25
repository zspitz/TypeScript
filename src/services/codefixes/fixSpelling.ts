/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code],
        getCodeActions: getActionsForCorrectSpelling
    });

    function getActionsForCorrectSpelling(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;

        // This is the identifier of the misspelled word. eg:
        // this.speling = 1;
        //      ^^^^^^^
        const identifier = getTokenAtPosition(sourceFile, context.span.start);
        if (identifier.kind !== SyntaxKind.Identifier) {
            return undefined;
        }
        if (!isPropertyAccessExpression(identifier.parent)) {
            return undefined;
        }
        const checker = context.program.getTypeChecker();
        const containingType = checker.getTypeAtLocation(identifier.parent.expression)
        const suggestion = checker.getSuggestionForNonexistentProperty(identifier as Identifier, containingType);
        if (!suggestion) {
            return undefined;
        }

        return [{
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Change_identifier_to_0), [suggestion]),
            changes: [{
                fileName: sourceFile.fileName,
                textChanges: [{
                    span: { start: identifier.pos, length: identifier.end - identifier.pos },
                    newText: suggestion
                }],
            }],
        }];
    }
}
