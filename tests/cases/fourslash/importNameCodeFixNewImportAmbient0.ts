/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: ambientModule.ts
//// declare module "ambient-module" {
////    export function f1();
////    export var v1;
//// }

verify.importFixAtPosition([
`NaN();`,
`import { f1 } from "ambient-module";

f1();`
]);
