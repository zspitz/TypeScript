/// <reference path="fourslash.ts" />

// @Filename: foo.tsx
// @jsx: preserve
////declare namespace JSX {
////    export interface IntrinsicElements {
////        [elemName: string]: any;
////    }
////}
////
////function foo() {
////    return <foo/**//>;
////}

//debug.printErrorList();
//verify.numberOfErrorsInCurrentFile(0);
goTo.marker();
verify.quickInfoIs("x");

/*

SUMMARY:
    We have semanticMeaning = SemanticMeaning.Value, but 'foo' refers to the interface...


===

services.ts getQuickInfoAtPosition:
    node = the "foo" identifier
    symbol = IntrinsicElements

So we move to getSymbolDisplayPartsDocumentationAndSymbolKind(symbol, sourceFile, the FunctionDeclaration, location = the "foo" Identifier, semanticMeaning = SemanticMeaning.Value)

    symbolFlags = SymbolFlags.Interface
    symbolKind = ScriptElementKind.unknown = ""
        bacuse we call getSymbolKindOfConstructorPropertyMethodAccessorFunctionOrVar(symbol, SymbolFlags.Interface, location = the "foo" identifier)
        It refers to an interface, so return ScriptElementKind.unknown


    Then we try `if ((symbolFlags & SymbolFlags.Interface) && (semanticMeaning & SemanticMeaning.Type))`, but it's being used as a value so that's no good

    finally, we call 'getSymbolKind'
        flags = symbol.getFlags() = SymbolFlags.Interface
        So we return ScriptElementKind.interfaceElement

    So, we return:
        { displayParts = [], documentation = [], symbolKind = ScriptElementKind.interfaceElement }


Back in verifyQuickInfoString, actualQuickInfo.displayParts is empty, so we get actualQuickInfoText = ""


*/