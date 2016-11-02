//TODO:RENAME THIS FILE
// @module: commonjs
// @noImplicitReferences: true
// @traceResolution: true
// @outDir: bin
// @fullEmitPaths: true

// @filename: /test/index.ts
// @symlink: /app/node_modules/test/index.ts
export const x = 0;

// @filename: /app/index.ts
import { x } from "test";
x + 1;

// @filename: /tsconfig.json
{}
