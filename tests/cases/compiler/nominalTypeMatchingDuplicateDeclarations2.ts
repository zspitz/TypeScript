// @Filename: /node_modules/a/index.d.ts
import X from "x";
export function a(x: X): void;

// @Filename: /node_modules/a/node_modules/x/index.d.ts
export default class X {
    protected m(): void;
    private x: number;
}

// @Filename: /node_modules/b/index.d.ts
import X from "x";
export const b: X;

// @Filename: /node_modules/b/node_modules/x/index.d.ts
export default class X {
    protected m(): void;
    private x: number;
    // OK to provide more members
    private y: number;
}

// @Filename: /node_modules/c/index.d.ts
import X from "x";
export const c: X;

// @Filename: /node_modules/c/node_modules/x/index.d.ts
export default class X {
    protected m(): void;
    // Not OK to be missing a member
}

// @Filename: /src/a.ts
import { a } from "a";
import { b } from "b";
import { c } from "c";
a(b);
a(c); // Error
