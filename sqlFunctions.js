// sqlFunctions.js

// Logical Operators
export function isTrue(value) {
    return value === 'T';
}

export function isFalse(value) {
    return value === 'F';
}

export function isNull(value) {
    return value === '';
}

export function isNotNull(value) {
    return value !== '';
}

// Comparison Operators
export function equals(a, b) {
    return a === b;
}

export function notEquals(a, b) {
    return a !== b;
}

export function lessThan(a, b) {
    return a < b;
}

export function lessThanOrEqual(a, b) {
    return a <= b;
}

export function greaterThan(a, b) {
    return a > b;
}

export function greaterThanOrEqual(a, b) {
    return a >= b;
}

// BETWEEN
export function between(value, min, max) {
    return value >= min && value <= max;
}

// IN
export function inList(value, list) {
    return list.includes(value);
}

// LIKE
export function like(value, pattern) {
    const regex = new RegExp(pattern.replace('%', '.*'));
    return regex.test(value);
}

// EXISTS
export function exists(array) {
    return array.length > 0;
}

// IS DISTINCT FROM
export function isDistinctFrom(a, b) {
    return a !== b;
}

// CASE WHEN THEN ELSE END
export function caseWhen(conditions) {
    for (const condition of conditions) {
        if (condition.condition) return condition.result;
    }
    return conditions.find(c => c.default)?.result;
}

// COALESCE
export function coalesce(...values) {
    return values.find(v => v !== null && v !== undefined);
}

// NULLIF
export function nullIf(a, b) {
    return a === b ? null : a;
}

// IS TRUE, IS FALSE, IS UNKNOWN
export function isTrue(value) {
    return value === 'T';
}

export function isFalse(value) {
    return value === 'F';
}

export function isUnknown(value) {
    return value === null || value === undefined;
}

// IS NOT TRUE, IS NOT FALSE, IS NOT UNKNOWN
export function isNotTrue(value) {
    return value !== 'T';
}

export function isNotFalse(value) {
    return value !== 'F';
}

export function isNotUnknown(value) {
    return value !== null && value !== undefined;
}
