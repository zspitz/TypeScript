/// <reference path='fourslash.ts'/>

////declare namespace [|N|] {
////    export var x: number;
////}
////declare module "mod" {
////    export = N;
////}
////declare module "test" {
////    import * as N from "mod";
////    export { N }; // Renaming N here would rename
////}
////declare module "test2" {
////    import { [|N|] } from "test";
////    export const y: typeof /**/N.x;
////}

const ranges = test.ranges();
verify.symbolAtLocation("", ranges[1]);
