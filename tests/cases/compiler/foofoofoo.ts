// @noImplicitReferences: true

// @Filename: /node_modules/a/index.d.ts
import C from "c";
export default function a(c: C): void;

// @Filename: /node_modules/a/node_modules/c/index.d.ts
export default class C {
    private _foo;

    method(): void;
}

// @Filename: /node_modules/b/node_modules/c/index.d.ts
export default class C {
    private _foo;

    method(): void;
}

// @Filename: /node_modules/b/index.d.ts
import C from "c";

declare const c: C;
export default c;

// @Filename: /src/a.ts
import a from "a";
import b from "b";
a(b);

