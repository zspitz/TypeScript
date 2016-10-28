//// [tests/cases/conformance/moduleResolution/typeRoots_node.ts] ////

//// [index.d.ts]
export function foo(): void;

//// [a.ts]
import { foo } from "foo";


//// [a.js]
"use strict";
