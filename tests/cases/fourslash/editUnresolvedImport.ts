/// <reference path='fourslash.ts'/>

// @Filename: /node_modules/dir/m1.ts
//// export default class { x: number; }

// @Filename: /node_modules/dir/m2.ts
//// export default class { x: number; }

// @Filename: /node_modules/dir/m3.ts
//// export default class { x: number; }

// @Filename: /node_modules/dir/m4.ts
//// export default class { x: number; }

// @Filename: /node_modules/dir/m5.ts
//// export default class { x: number; }

// @Filename: /src/f1.ts
//// import M1 from "dir/m1";
//// import M2 from "dir/m2";
//// import M3 from "dir/m3";
//// import M4 from "dir/m4";
//// import M5 from "/*1*/";
//// export default class {
////     f1(m: M1){ return m.x; }
////     f2(m: M2){ return m.x; }
////     f3(m: M3){ return m.x; }
////     f4(m: M4){ return m.x; }
////     f5(m: M5){ return m.x; }
//// }

// @Filename: /src/f2.ts
//// import M1 from "dir/m1";
//// import M2 from "dir/m2";
//// import M3 from "dir/m3";
//// import M4 from "dir/m4";
//// import M5 from "dir/m5";
//// export default class {
////     f1(m: M1){ return m.x; }
////     f2(m: M2){ return m.x; }
////     f3(m: M3){ return m.x; }
////     f4(m: M4){ return m.x; }
////     f5(m: M5){ return m.x; }
//// }


goTo.marker("1");
edit.insert("dir");
verify.synchronizeHostData(1);

throw new Error("reached end of test");