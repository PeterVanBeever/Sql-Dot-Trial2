// stringFunctions.js

export function concat(...strings) {
    return strings.join('');
}

export function length(string) {
    return string.length;
}

export function substring(string, start, length) {
    return string.substr(start, length);
}

export function replace(string, search, replacement) {
    return string.replace(new RegExp(search, 'g'), replacement);
}

export function upper(string) {
    return string.toUpperCase();
}

export function lower(string) {
    return string.toLowerCase();
}

export function trim(string) {
    return string.trim();
}

export function charIndex(string, substring) {
    return string.indexOf(substring);
}

export function instr(string, substring) {
    return charIndex(string, substring);
}

export function position(string, substring) {
    return charIndex(string, substring);
}

export function lpad(string, length, pad) {
    return string.padStart(length, pad);
}

export function rpad(string, length, pad) {
    return string.padEnd(length, pad);
}
