// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
import { Z } from "x";
export function a(x: Z.Y.X): void;

// @Filename: /node_modules/a/node_modules/x/index.d.ts
export namespace Z {
    namespace Y {
        class X {
            private x: number;
        }
    }
}

// @Filename: /node_modules/b/index.d.ts
import { Z } from "x";
export const b: Z.Y.X;

// @Filename: /node_modules/b/node_modules/x/index.d.ts
export namespace Z {
    namespace Y {
        class X {
            private x: number;
        }
    }
}

// @Filename: /node_modules/c/index.d.ts
import { Y } from "x";
export const c: Y.Z.X;

// @Filename: /node_modules/c/node_modules/x/index.d.ts
export namespace Y {
    namespace Z {
        class X {
            private x: number;
        }
    }
}

// @Filename: /node_modules/d/index.d.ts
import { X } from "x";
export const d: X;

// @Filename: /node_modules/d/node_modules/x/index.d.ts
// Mismatch -- is a named export, not a default export
export class X {
    private x: number;
}

//TODO: error if one is default export and other is const
//TODO: test with class inside a namespace

// @Filename: /src/a.ts
import { a } from "a";
import { b } from "b";
import { c } from "c";
a(b); // Works
a(c); // Error

