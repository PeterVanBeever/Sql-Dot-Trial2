export const columnNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => `${letter}${letter}`);
export const tableNames = [
    "Atlas", "Basilisk", "Cynosure", "Dynamo", "Eclipse", "Falcon", "Garnet", "Horizon", "Ivory", "Jovial",
    "Krypton", "Lynx", "Mosaic", "Nebula", "Opal", "Phoenix", "Quartz", "Raven", "Sapphire", "Titan",
    "Umbra", "Vortex", "Whisper", "Xenon", "Yonder", "Zephyr", "Aurora", "Blizzard", "Celestial", "Drift",
    "Eon", "Frost", "Glimmer", "Haven", "Inspire", "Jewel", "Kaleidoscope", "Lunar", "Mystic", "Nexus",
    "Obsidian", "Pinnacle", "Quest", "Radiance", "Serene", "Tempest", "Unity", "Velocity", "Wavelength",
    "Xenith", "Yearning", "Zenith", "Aegis", "Bolt", "Cascade", "Dusk", "Eminence", "Fable", "Grove",
    "Halo", "Impulse", "Jade", "Karma", "Legacy", "Monarch", "Orchid", "Pulse", "Reverie", "Sierra",
    "Trove", "Utopia", "Vanguard", "Wander", "Xeno", "Yin", "Zodiac", "Aria", "Blaze", "Clarity",
    "Dynasty", "Echo", "Flare", "Glide", "Ignite", "Joy", "Kismet", "Lustre", "Momentum", "Nova",
    "Oasis", "Prism", "Radiant", "Summit", "Traverse", "Voyage"
];
export const columnTypes = ['num', 'letter', 'bool'];
export const numArray = '0123456789'.split('');
export const lowerArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const upperArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const boolArray = ['T', 'F'];

export function getRandomColumnNames() {
    let columnsA = [];
    let columnsB = [];
    let usedNames = new Set();

    while (columnsA.length < 10) {
        const name = columnNames[Math.floor(Math.random() * columnNames.length)];
        const type = columnTypes[Math.floor(Math.random() * columnTypes.length)];
        if (!usedNames.has(name)) {
            columnsA.push({ name, type });
            usedNames.add(name);
        }
    }

    usedNames.clear();  // Reset the set for the second array

    while (columnsB.length < 10) {
        const name = columnNames[Math.floor(Math.random() * columnNames.length)];
        const type = columnTypes[Math.floor(Math.random() * columnTypes.length)];
        if (!usedNames.has(name)) {
            columnsB.push({ name, type });
            usedNames.add(name);
        }
    }

    return {
        columnsA: columnsA,
        columnsB: columnsB
    };
}

export function getRandomData(type) {
    switch (type) {
        case 'num':
            return numArray[Math.floor(Math.random() * numArray.length)];
        case 'letter':
            return Math.random() < 0.5
                ? lowerArray[Math.floor(Math.random() * lowerArray.length)]
                : upperArray[Math.floor(Math.random() * upperArray.length)];
        case 'bool':
            return boolArray[Math.floor(Math.random() * boolArray.length)];
        default:
            throw new Error(`Unsupported data type: ${type}`);
    }
}
