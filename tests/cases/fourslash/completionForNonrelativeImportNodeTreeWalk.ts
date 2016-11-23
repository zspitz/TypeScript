/// <reference path='fourslash.ts' />

// We don't walk the filesystem to search for modules. Instead we use cheap heuristics.

// @moduleResolution: node

// @Filename: src/test.ts
//// import {I as I0} from "/*0*/
//// import * as IModule0 from "/*1*/
//// import IRequireModule0 from "/*2*/
//// import foo2 = require("/*3*/
//// var foo3 = require("/*4*/

// @Filename: src/not_present.ts
// @Filename: src/node_modules/1.ts
// @Filename: src/node_modules/2.tsx
// @Filename: src/node_modules/3.d.ts
// @Filename: src/node_modules/4/package.json
// @Filename: src/node_modules/5/index.ts
// @Filename: src/node_modules/6/index.tsx
// @Filename: src/node_modules/7/index.d.ts
// @Filename: src/node_modules/@types/8.ts
// @Filename: src/node_modules/@types/9.tsx
// @Filename: src/node_modules/@types/10.d.ts
// @Filename: src/node_modules/@types/11/package.json
// @Filename: src/node_modules/@types/12/index.ts
// @Filename: src/node_modules/@types/13/index.tsx
// @Filename: src/node_modules/@types/14/index.d.ts


for (let marker = 0; marker < 5; marker++) {
    goTo.marker(marker.toString());
    verify.completionListIsEmpty();
}