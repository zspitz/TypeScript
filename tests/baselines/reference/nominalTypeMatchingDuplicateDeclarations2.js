//// [tests/cases/compiler/nominalTypeMatchingDuplicateDeclarations2.ts] ////

//// [index.d.ts]
import X from "x";
export function a(x: X): void;

//// [index.d.ts]
export default class X {
    protected m(): void;
    private x: number;
}

//// [index.d.ts]
import X from "x";
export const b: X;

//// [index.d.ts]
export default class X {
    protected m(): void;
    private x: number;
    // OK to provide more members
    private y: number;
}

//// [index.d.ts]
import X from "x";
export const c: X;

//// [index.d.ts]
export default class X {
    protected m(): void;
    // Not OK to be missing a member
}

//// [a.ts]
import { a } from "a";
import { b } from "b";
import { c } from "c";
a(b);
a(c); // Error


//// [a.js]
"use strict";
exports.__esModule = true;
var a_1 = require("a");
var b_1 = require("b");
var c_1 = require("c");
a_1.a(b_1.b);
a_1.a(c_1.c); // Error
