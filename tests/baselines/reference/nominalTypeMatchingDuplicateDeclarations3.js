//// [tests/cases/compiler/nominalTypeMatchingDuplicateDeclarations3.ts] ////

//// [index.d.ts]
import X = require("x");
export { X as A };

//// [index.d.ts]
export = class {
    private m(): void;
}

//// [index.d.ts]
import X = require("x");
export { X as B };

//// [index.d.ts]
export = class {
    private m(): void;
}

//// [a.ts]
import { A } from "a";
import { B } from "b";
let a = new A();
a = new B();


//// [a.js]
"use strict";
exports.__esModule = true;
var a_1 = require("a");
var b_1 = require("b");
var a = new a_1.A();
a = new b_1.B();
