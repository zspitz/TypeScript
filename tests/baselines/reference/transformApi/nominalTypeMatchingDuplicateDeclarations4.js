//// [tests/cases/compiler/nominalTypeMatchingDuplicateDeclarations4.ts] ////

//// [c0.d.ts]
export class C {
    private m(): void;
}

//// [c1.d.ts]
export class C {
    private m(): void;
}

//// [a.ts]
import { C as C0 } from "a/c0";
import { C as C1 } from "a/c1";
let c = new C0();
c = new C1();


//// [a.js]
"use strict";
exports.__esModule = true;
var c0_1 = require("a/c0");
var c1_1 = require("a/c1");
var c = new c0_1.C();
c = new c1_1.C();
