/// <reference path='fourslash.ts' />

// if baseURL is specified but paths is not, then we offer completions for non-relative imports
// relative to the baseURL.

// @Filename: tsconfig.json
//// {
////     "compilerOptions": {
////         "baseUrl": "./modules"
////     }
//// }

// @Filename: test.ts
//// import * as a from "/*0*/
//// import * as b from "dir//*1*/"

// @Filename: node_modules/bad.ts

// @Filename: modules/a.ts
//// /*marker_a*/

// @Filename: modules/a.d.ts
//// /*marker_a_d*/

// @Filename: modules/dir/b.ts
//// /*marker_b*/

goTo.marker("0");
verify.completionListContains("a");
verify.completionListContains("dir");
verify.not.completionListItemsCountIsGreaterThan(2);

goTo.marker("1");
verify.completionListContains("b");
verify.not.completionListItemsCountIsGreaterThan(1);