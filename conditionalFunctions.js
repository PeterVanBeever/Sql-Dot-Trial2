// conditionalFunctions.js

export function coalesce(...values) {
    return values.find(v => v !== null && v !== undefined);
}

export function nullIf(a, b) {
    return a === b ? null : a;
}

export function ifNull(value, replacement) {
    return value === null ? replacement : value;
}

export function isNull(value) {
    return value === null;
}

export function isNotNull(value) {
    return value !== null;
}

export function isDistinctFrom(a, b) {
    return a !== b;
}
