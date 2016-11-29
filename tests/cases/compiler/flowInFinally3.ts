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
    catch(e) {
        result = {x : 1};
    }
    finally {
        let x = 5;
        while (x < 100) {
        }

        try {
            result = {x: 42};
        }
        finally {
            let z = 5;
            closeFile();
        }
    }
}
let a = 1;
result.x