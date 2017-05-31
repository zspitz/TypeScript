// @Filename: /node_modules/a/index.d.ts
import { G } from "x";
export function useMX(x: G.M.X): void;
export function useNX(x: G.N.X): void;
export const an: G.N.X;

// @Filename: /node_modules/a/node_modules/x/index.d.ts
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

// @Filename: /node_modules/b/index.d.ts
import { G } from "x";
export const bm: G.M.X;
export const bn: G.N.X;

// @Filename: /node_modules/b/node_modules/x/index.d.ts
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

// @Filename: /src/a.ts
import { an, useMX, useNX } from "a";
import { bm, bn } from "b";

// Works:
useMX(bm);
useNX(bn);

// Error:
useMX(an);
useMX(bn);
