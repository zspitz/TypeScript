/// <reference path="fourslash.ts" />

////function foo<T>(arg: T) {}
////foo<"foo" | "bar">("/**/");

goTo.marker();
verify.completionListContains("foo");
//verify.currentSignatureHelpIs("foo<number>(arg: number)");
