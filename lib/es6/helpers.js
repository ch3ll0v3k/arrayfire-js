'use strict';
const Dim4 = require('./Dim4');
const _ = require('lodash');
const assert = require('assert');
const fastcall = require('fastcall');
const ArrayType = fastcall.ArrayType;
const FloatArray = new ArrayType('float');
const semver = require('semver');

const helpers = exports;

helpers.getHandle = function (array) {
    if (array.handle) {
        return array.handle;
    }
    return array;
};

helpers.toBuffer = function (obj) {
    if (Buffer.isBuffer(obj)) {
        return obj;
    }
    if (_.isArray(obj)) {
        const arr = new FloatArray(obj.length);
        for (let i = 0; i < obj.length; i++) {
            arr.set(i, Number(obj[i]));
        }
        return arr.buffer;
    }
    if (_.isTypedArray(obj)) {
        return _typedArrayToBuffer(obj);
    }
    throw new TypeError('Argument "obj" is not a Buffer.');
};

helpers.typedArrayToBuffer = function (arr) {
    assert(_.isTypedArray(arr), 'Argument "arr" is not a typed array.');

    return _typedArrayToBuffer(arr);
};

function _typedArrayToBuffer(arr) {
    if (arr.byteLength !== arr.buffer.byteLength) {
        return helpers.arrayToBuffer(arr.buffer, arr.byteOffset, arr.byteLength);
    }
    return helpers.arrayToBuffer(arr.buffer);
}

if (semver.gt(process.versions.node, '5.1.0')) {
    helpers.arrayToBuffer = function (arr, byteOffset, length) {
        return Buffer.from(arr, byteOffset, length);
    };
}
else {
    helpers.arrayToBuffer = function (arr, byteOffset, length) {
        return new Buffer(arr, byteOffset, length);
    };
}