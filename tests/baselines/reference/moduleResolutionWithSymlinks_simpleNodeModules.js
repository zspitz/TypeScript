//// [tests/cases/compiler/moduleResolutionWithSymlinks_simpleNodeModules.ts] ////

//// [index.ts]

export const x = 0;

//// [index.ts]
import { x } from "test";
x + 1;


//// [bin/index.js]
"use strict";
var test_1 = require("test");
test_1.x + 1;
