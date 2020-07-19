function stringToNumber(str, code) {
    let arr = [];
    if (typeof str == "string" && (code === 2 || code === 8 || code === 10 || code === 16)) {
        for (let ch of str) {
            arr.push(ch.codePointAt(0).toString(code));
        }
    } else {
        console.log("参数不匹配");
    }
    return arr;
}


function numberToString(num, code) {
    if (typeof num == "number" && (code === 2 || code === 8 || code === 10 || code === 16)) {
        return String.fromCodePoint(parseInt(num, code));
    } else {
        return "";
    }
}


var realm = [
    Object,
    Function,
    Boolean,
    Symbol,
    Error,
    AggregateError,
    EvalError,
    InternalError,
    RangeError,
    Number,
    BigInt,
    Math,
    Date,
    String,
    RegExp,
    Array,
    Int8Array,
    Uint8Array,
    Uint8ClampedArray,
    Int16Array,
    Uint16Array,
    Int32Array,
    Map,
    Set,
    WeakMap,
    WeakSet,
    ArrayBuffer,
    SharedArrayBuffer,
    Atomics,
    DataView,
    JSON,
    Promise,
    Generator,
    GeneratorFunction,
    AsyncFunction,
    Reflect,
    Proxy,
    Intl,
    Intl.Collator,
    Intl.DateTimeFormat,
    Intl.ListFormat,
    Intl.NumberFormat]
