// @strictNullChecks: true
declare function openFile(): void
declare function closeFile(): void
declare function someOperation(): { x: number }

var result: {x: number} | undefined;
openFile()
try {
  result = someOperation()
} 
finally {
  let x = 5;
  while (x < 100) {
  }
  closeFile();
}

result.x