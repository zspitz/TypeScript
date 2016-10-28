//// [tests/cases/conformance/moduleResolution/typeRoots_classic.ts] ////

//// [index.d.ts]
export function foo(): void;

//// [a.ts]
import { foo } from "foo";


//// [a.js]
"use strict";
