// @noImplicitReferences: true
// @traceResolution: true
// @fullEmitPaths: true
// Test of GH#10364

// @filename: /shared/abc.ts
// @symlink: /src/shared/abc.ts
export const x = 0;

// @filename: /src/app.ts
import { x } from './shared/abc';
x + 1;

// @filename: /src/tsconfig.json
{
    "compilerOptions": {
        "outDir": "bin"
    }
}
