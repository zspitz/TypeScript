// @allowJS: true
// @suppressOutputPathCheck: true

// @filename: 0.js
// @ts-check

/** @type {object} */
var obj1;
obj1 = {};
obj1 = 1;

/** @type {Object} */
var obj2;
obj2 = {};
obj2 = 1;

/** @type {Object.<string, number>} */
var obj3;

/** @type number */
var n1 = obj3["n1"];

obj3 = {};

/** @type {object.<string, number>} */
var obj4;

/** @type number */
var n1 = obj4["n1"];

obj4 = {};