// These imports must all resolve with the same packageName of "foo",
// or else it will trigger an assertion in `setPackageName` in `program.ts`

// @Filename: /a.ts
import * as foo from "foo";
import * as foo2 from "foo/";
import * as foo3 from "@types/foo/";
import * as foo4 from "@types\\foo\\";
// Relative imports do not have any packageName, so ignored.
import * as foo5 from "./node_modules/@types/foo";

// @Filename: /node_modules/@types/foo/index.d.ts
export const x: number;
