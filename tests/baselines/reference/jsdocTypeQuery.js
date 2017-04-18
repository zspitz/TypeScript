//// [tests/cases/conformance/jsdoc/jsdocTypeQuery.ts] ////

//// [a.js]
var x = 0;

/**
 * @type {typeof x}
 */
var y;


/**
 * @type {Array<typeof x>}
 */
var y_a;

/**
 * @type {[typeof x, typeof x]}
 */
var y_t;

//// [b.ts]
var z: number;
var z = y;

var z_a: number[];
var z_a = y_a;

var z_t: [number, number];
var z_t = y_t;

//// [out.js]
var x = 0;
/**
 * @type {typeof x}
 */
var y;
/**
 * @type {Array<typeof x>}
 */
var y_a;
/**
 * @type {[typeof x, typeof x]}
 */
var y_t;
var z;
var z = y;
var z_a;
var z_a = y_a;
var z_t;
var z_t = y_t;
