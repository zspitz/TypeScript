// @Filename: /node_modules/a/index.d.ts
import X = require("x");
export { X as A };

// @Filename: /node_modules/a/node_modules/x/index.d.ts
export = class {
    private m(): void;
}

// @Filename: /node_modules/b/index.d.ts
import X = require("x");
export { X as B };

// @Filename: /node_modules/b/node_modules/x/index.d.ts
export = class {
    private m(): void;
}

// @Filename: /src/a.ts
import { A } from "a";
import { B } from "b";
let a = new A();
a = new B();
