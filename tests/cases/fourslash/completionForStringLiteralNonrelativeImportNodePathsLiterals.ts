/// <reference path='fourslash.ts' />

// If baseURL and paths is specified, we compare against the baseUrl/paths rule.
// We do NOT do a raw comparison against baseUrl unless we specified such a paths rule.

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./modules"
////     }
//// }

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./modules",
////         "paths": {
////             "a":               ["a.ts"],
////             "b":               ["b.ts"],
////             "c":               ["c.ts", "c.d.ts"],
////             "d":               ["dir/d.ts"],
////             "e/e":             ["dir/e.ts"],
////             "*":               ["dir_star/*"],
////             "prefix_*_suffix": ["dir_star/*"],
////             "i":               ["i.ts"],           // Target does not exist.
////             "j/j":             ["dir/j.ts"]        // Target does not exist.
////         }
////     }
//// }

// @Filename: test.ts
//// import * as a from "/*0*/
//// import * as b from "e//*1*/
//// import * as c from "g//*2*/
//// import * as d from "prefix_dir2//*3*/_suffix

// @Filename: node_modules/bad.ts
//// /*marker_bad*/

// @Filename: modules/also_bad.ts
//// /*marker_also_bad*/

// @Filename: modules/a.ts
//// /*marker_a*/

// @Filename: modules/b.ts
//// /*marker_b*/

// @Filename: modules/c.ts
//// /*marker_c*/

// @Filename: modules/c.d.ts
//// /*marker_c_d*/

// @Filename: modules/dir/d.ts
//// /*marker_d*/

// @Filename: modules/dir/e.ts
//// /*marker_e*/

// @Filename: modules/dir_star/f.ts
//// /*marker_f*/

// @Filename: modules/dir_star/g.ts
//// /*marker_g*/

// @Filename: modules/dir_star/dir2/h.ts
//// /*marker_h*/

goTo.marker("0");
verify.completionListContains("a");
verify.completionListContains("b");
verify.completionListContains("c");
verify.completionListContains("d");
verify.completionListContains("e");
verify.completionListContains("f");
verify.completionListContains("g");
verify.completionListContains("dir2");
verify.completionListContains("prefix_f_suffix");
verify.completionListContains("prefix_g_suffix");
verify.completionListContains("prefix_dir2_suffix");
verify.completionListContains("h");
verify.completionListContains("i");
verify.not.completionListItemsCountIsGreaterThan(5);
/*
goTo.marker("1");
verify.completionListContains("d");
verify.not.completionListItemsCountIsGreaterThan(1);

goTo.marker("2");
verify.completionListIsEmpty();

goTo.marker("2");
verify.completionListContains("h");
*/