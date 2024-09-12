// dateFunctions.js

export function now() {
    return new Date();
}

export function currentDate() {
    return now().toISOString().split('T')[0];
}

export function currentTime() {
    return now().toTimeString().split(' ')[0];
}

export function currentTimestamp() {
    return now().toISOString();
}

// Date manipulation
export function datePart(date, part) {
    const d = new Date(date);
    switch (part) {
        case 'year': return d.getFullYear();
        case 'month': return d.getMonth() + 1;
        case 'day': return d.getDate();
        case 'hour': return d.getHours();
        case 'minute': return d.getMinutes();
        case 'second': return d.getSeconds();
        default: return null;
    }
}

export function dateAdd(date, interval, amount) {
    const d = new Date(date);
    switch (interval) {
        case 'day': d.setDate(d.getDate() + amount); break;
        case 'month': d.setMonth(d.getMonth() + amount); break;
        case 'year': d.setFullYear(d.getFullYear() + amount); break;
        // Other intervals can be added
    }
    return d;
}

export function dateDiff(date1, date2) {
    return Math.abs(new Date(date1) - new Date(date2)) / (1000 * 60 * 60 * 24);
}

export function extract(date, part) {
    return datePart(date, part);
}

export function dateTrunc(date, part) {
    const d = new Date(date);
    switch (part) {
        case 'day': return new Date(d.setHours(0, 0, 0, 0));
        case 'month': return new Date(d.setDate(1));
        case 'year': return new Date(d.setMonth(0, 1));
        default: return d;
    }
}

export function toDate(dateString) {
    return new Date(dateString);
}

export function toTimestamp(dateString) {
    return new Date(dateString);
}
