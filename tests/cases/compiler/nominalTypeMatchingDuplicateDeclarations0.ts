// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
import X from "x";
export function a(x: X): void;

// @Filename: /node_modules/a/node_modules/x/index.d.ts
export default class X {
    private x: number;
}

// @Filename: /node_modules/b/index.d.ts
import X from "x";
export const b: X;

// @Filename: /node_modules/b/node_modules/x/index.d.ts
export default class X {
    private x: number;
}

// @Filename: /node_modules/c/index.d.ts
import X from "x";
export const c: X;

// @Filename: /node_modules/c/node_modules/x/index.d.ts
// Mismatch -- different type
export default class X {
    private x: string;
}

// @Filename: /node_modules/d/index.d.ts
import { X } from "x";
export const d: X;

// @Filename: /node_modules/d/node_modules/x/index.d.ts
// Mismatch -- is a named export, not a default export
export class X {
    private x: number;
}

// @Filename: /src/a.ts
import { a } from "a";
import { b } from "b";
import { c } from "c";
import { d } from "d";
a(b); // Works
a(c); // Error
a(d); // Error

