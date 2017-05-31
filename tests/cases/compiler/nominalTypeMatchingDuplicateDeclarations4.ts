// @Filename: /node_modules/a/c0.d.ts
export class C {
    private m(): void;
}

// @Filename: /node_modules/a/c1.d.ts
export class C {
    private m(): void;
}

// @Filename: /src/a.ts
import { C as C0 } from "a/c0";
import { C as C1 } from "a/c1";
let c = new C0();
c = new C1();
