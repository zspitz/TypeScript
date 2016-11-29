// @strictNullChecks: true
// @flowGraph: true
declare function openFile(): void
declare function closeFile(): void
declare function someOperation(): { x: number }

var result: { x: number } | undefined;
openFile()
while ("".length === 1) {
    try {
        result = someOperation()
    }
    finally {
        let x = 5;
        while (x < 100) {
        }
        closeFile();
        break;
    }
}
let a = 1;
result.x