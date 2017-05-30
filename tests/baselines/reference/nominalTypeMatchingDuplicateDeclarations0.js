//// [tests/cases/compiler/nominalTypeMatchingDuplicateDeclarations0.ts] ////

//// [index.d.ts]
import X from "x";
export function a(x: X): void;

//// [index.d.ts]
export default class X {
    private x: number;
}

//// [index.d.ts]
import X from "x";
export const b: X;

//// [index.d.ts]
export default class X {
    private x: number;
}

//// [index.d.ts]
import X from "x";
export const c: X;

//// [index.d.ts]
// Mismatch -- different type
export default class X {
    private x: string;
}

//// [index.d.ts]
import { X } from "x";
export const d: X;

//// [index.d.ts]
// Mismatch -- is a named export, not a default export
export class X {
    private x: number;
}

//// [a.ts]
import { a } from "a";
import { b } from "b";
import { c } from "c";
import { d } from "d";
a(b); // Works
a(c); // Error
a(d); // Error



//// [a.js]
"use strict";
exports.__esModule = true;
var a_1 = require("a");
var b_1 = require("b");
var c_1 = require("c");
var d_1 = require("d");
a_1.a(b_1.b); // Works
a_1.a(c_1.c); // Error
a_1.a(d_1.d); // Error
