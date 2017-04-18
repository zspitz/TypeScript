// @allowJs: true
// @out: out.js

// @filename: a.js
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

// @filename: b.ts
var z: number;
var z = y;

var z_a: number[];
var z_a = y_a;

var z_t: [number, number];
var z_t = y_t;