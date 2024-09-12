// aggregateFunctions.js

// Aggregation Functions
export function count(array) {
    return array.length;
}

export function sum(array) {
    return array.reduce((a, b) => a + b, 0);
}

export function avg(array) {
    return sum(array) / count(array);
}

export function min(array) {
    return Math.min(...array);
}

export function max(array) {
    return Math.max(...array);
}

// Grouping and Concatenation
export function groupConcat(array, separator = ',') {
    return array.join(separator);
}

export function stringAgg(array, separator = ',') {
    return groupConcat(array, separator);
}

export function arrayAgg(array) {
    return array;
}
