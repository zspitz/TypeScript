// @traceResolution: true
// @noImplicitReferences: true
// @currentDirectory: /
//TODO: also want a test with "module": "node"

// @filename: /tsconfig.json
{
    "compilerOptions": {
        "typeRoots": ["./types"]
    }
}

// @filename: /types/foo/index.d.ts
export function foo(): void;

// @filename: /a.ts
import { foo } from "foo";
