//// [tests/cases/compiler/moduleResolutionWithSymlinks_withOutDir.ts] ////

//// [abc.ts]
// Test of GH#10364

export const x = 0;

//// [app.ts]
import { x } from "./shared/abc";
x + 1;


//// [/src/bin/shared/abc.js]
// Test of GH#10364
"use strict";
exports.x = 0;
//// [/src/bin/src/app.js]
"use strict";
var abc_1 = require("./shared/abc");
abc_1.x + 1;
