/// <reference path='fourslash.ts' />

// Should give completions for node modules and files within those modules with ts file extensions/
// When baseURL isn't specified, _________________??????????????????

// @moduleResolution: node

// @Filename: src/test.ts
//// import {I as I0} from "/*0*/
//// import * as IModule0 from "/*1*/
//// import IRequireModule0 from "/*2*/
//// // TODO:(arozga) require syntax?


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

// @Filename: not_present.ts
// @Filename: node_modules/15.ts
// @Filename: node_modules/16.tsx
// @Filename: node_modules/17.d.ts
// @Filename: node_modules/18/package.json
// @Filename: node_modules/19/index.ts
// @Filename: node_modules/20/index.tsx
// @Filename: node_modules/21/index.d.ts
// @Filename: node_modules/@types/22.ts
// @Filename: node_modules/@types/23.tsx
// @Filename: node_modules/@types/24.d.ts
// @Filename: node_modules/@types/25/package.json
// @Filename: node_modules/@types/26/index.ts
// @Filename: node_modules/@types/27/index.tsx
// @Filename: node_modules/@types/28/index.d.ts

for (let marker = 0; marker < 3; marker++) {
    goTo.marker(marker.toString());
    for (let i = 1; i < 29; i++) {
        verify.completionListContains(i.toString());
        verify.not.completionListItemsCountIsGreaterThan(28);
    }
}