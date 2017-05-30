//// [tests/cases/compiler/nominalTypeMatchingDuplicateDeclarations1.ts] ////

//// [index.d.ts]
import { G } from "x";
export function useMX(x: G.M.X): void;
export function useNX(x: G.N.X): void;
export const an: G.N.X;

//// [index.d.ts]
export namespace G {
    namespace M {
        class X {
            private x: number;
        }
    }
    namespace N {
        class X {
            private x: number;
        }
    }
}

//// [index.d.ts]
import { G } from "x";
export const bm: G.M.X;
export const bn: G.N.X;

//// [index.d.ts]
export namespace G {
    namespace M {
        class X {
            private x: number;
        }
    }

    namespace N {
        class X {
            private x: number;
        }
    }
}

//// [a.ts]
import { an, useMX, useNX } from "a";
import { bm, bn } from "b";

// Works:
useMX(bm);
useNX(bn);

// Error:
useMX(an);
useMX(bn);


//// [a.js]
"use strict";
exports.__esModule = true;
var a_1 = require("a");
var b_1 = require("b");
// Works:
a_1.useMX(b_1.bm);
a_1.useNX(b_1.bn);
// Error:
a_1.useMX(a_1.an);
a_1.useMX(b_1.bn);
