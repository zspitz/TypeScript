/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.Property_0_does_not_exist_on_type_1_Did_you_mean_2.code],
        getCodeActions: getActionsForCorrectSpelling
    });

    function getActionsForCorrectSpelling(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;

        // This is the identifier of the misspelled word. eg:
        // this.missing = 1;
        const token = getTokenAtPosition(sourceFile, context.span.start);
        if (token.kind !== SyntaxKind.Identifier) {
            return undefined;
        }
        if (!isPropertyAccessExpression(token.parent)) {
            return undefined;
        }
        // TODO: Retrieve the *correct* spelling from, probably, the CodeFixContext.
        // Or else by re-typechecking and re-calling getSuggestion. Which seems pointless.
        return [{
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Change_identifier_to_0), ["chunks"]),
            changes: [{
                fileName: sourceFile.fileName,
                textChanges: [{
                    span: { start: token.pos, length: token.end - token.pos },
                    newText: "chunks"
                }],
            }],
        }];
    }
}
