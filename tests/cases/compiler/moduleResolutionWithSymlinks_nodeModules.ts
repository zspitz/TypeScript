// @module: commonjs
// @noImplicitReferences: true
// @traceResolution: true

// @filename: /node_modules/@types/foo/index.d.ts
// @symlink: /src/node_modules/@types/foo/index.d.ts
export as namespace angular;
export const x: number;

// @filename: /node_modules/@types/bar/index.d.ts
// @symlink: /src/node_modules/@types/bar/index.d.ts
import * as angular from "foo";


// @filename: /src/a.ts
angular.x + 1;

// @filename: /src/tsconfig.json
{}
