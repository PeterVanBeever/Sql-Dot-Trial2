document.addEventListener('DOMContentLoaded', function () {
    const columnNames = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => `${letter}${letter}`);
    const tableNames = [
        "Atlas", "Basilisk", "Cynosure", "Dynamo", "Eclipse", "Falcon", "Garnet", "Horizon", "Ivory", "Jovial",
        "Krypton", "Lynx", "Mosaic", "Nebula", "Opal", "Phoenix", "Quartz", "Raven", "Sapphire", "Titan",
        "Umbra", "Vortex", "Whisper", "Xenon", "Yonder", "Zephyr", "Aurora", "Blizzard", "Celestial", "Drift",
        "Eon", "Frost", "Glimmer", "Haven", "Inspire", "Jewel", "Kaleidoscope", "Lunar", "Mystic", "Nexus",
        "Obsidian", "Pinnacle", "Quest", "Radiance", "Serene", "Tempest", "Unity", "Velocity", "Wavelength",
        "Xenith", "Yearning", "Zenith", "Aegis", "Bolt", "Cascade", "Dusk", "Eminence", "Fable", "Grove",
        "Halo", "Impulse", "Jade", "Karma", "Legacy", "Monarch", "Nebula", "Orchid", "Pulse", "Quest",
        "Reverie", "Sierra", "Trove", "Utopia", "Vanguard", "Wander", "Xeno", "Yin", "Zodiac", "Aria",
        "Blaze", "Clarity", "Dynasty", "Echo", "Flare", "Glide", "Horizon", "Ignite", "Joy", "Kismet",
        "Lustre", "Momentum", "Nova", "Oasis", "Prism", "Quest", "Radiant", "Summit", "Traverse", "Voyage"
    ];

    const columnTypes = ['num', 'letter', 'bool'];
    const numArray = '0123456789'.split('');
    const lowerArray = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const upperArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const boolArray = ['T', 'F'];

    const tableAColumns = document.getElementById('column-names-a');
    const tableBColumns = document.getElementById('column-names-b');
    const tableADots = document.getElementById('dots-a');
    const tableBDots = document.getElementById('dots-b');
    const tableAHeader = document.querySelector('#table-a h2');
    const tableBHeader = document.querySelector('#table-b h2');

    const getRandomColumnNames = () => {
        let columnsA = [];
        let columnsB = [];

        while (columnsA.length < 10) {
            const name = columnNames[Math.floor(Math.random() * columnNames.length)];
            const type = columnTypes[Math.floor(Math.random() * columnTypes.length)];
            if (!columnsA.some(col => col.name === name)) {
                columnsA.push({ name, type });
            }
        }

        while (columnsB.length < 10) {
            const name = columnNames[Math.floor(Math.random() * columnNames.length)];
            const type = columnTypes[Math.floor(Math.random() * columnTypes.length)];
            if (!columnsB.some(col => col.name === name)) {
                columnsB.push({ name, type });
            }
        }

        return {
            columnsA: columnsA,
            columnsB: columnsB
        };
    };

    const getRandomData = (type) => {
        switch (type) {
            case 'num':
                return numArray[Math.floor(Math.random() * numArray.length)];
            case 'letter':
                return Math.random() < 0.5
                    ? lowerArray[Math.floor(Math.random() * lowerArray.length)]
                    : upperArray[Math.floor(Math.random() * upperArray.length)];
            case 'bool':
                return boolArray[Math.floor(Math.random() * boolArray.length)];
        }
    };

    const updateTable = () => {
        const { columnsA, columnsB } = getRandomColumnNames();
        const randomTableNames = [...tableNames];
        
        let tableAName, tableBName;
        do {
            tableAName = randomTableNames[Math.floor(Math.random() * randomTableNames.length)];
            tableBName = randomTableNames[Math.floor(Math.random() * randomTableNames.length)];
        } while (tableAName === tableBName);

        tableAHeader.textContent = tableAName;
        tableBHeader.textContent = tableBName;

        tableAColumns.innerHTML = columnsA.map(col => `<div class="column-name">${col.name}</div>`).join('');
        tableBColumns.innerHTML = columnsB.map(col => `<div class="column-name">${col.name}</div>`).join('');

        tableADots.innerHTML = Array.from({ length: 100 }).map((_, i) => {
            const colIndex = i % 10;
            return `<div class="dot" data-table="a" data-column="${columnsA[colIndex].name}">${getRandomData(columnsA[colIndex].type)}</div>`;
        }).join('');

        tableBDots.innerHTML = Array.from({ length: 100 }).map((_, i) => {
            const colIndex = i % 10;
            return `<div class="dot" data-table="b" data-column="${columnsB[colIndex].name}">${getRandomData(columnsB[colIndex].type)}</div>`;
        }).join('');

        // Set all dots to gray by default
        const allDots = document.querySelectorAll('.dot');
        allDots.forEach(dot => dot.classList.add('gray'));
    };

    const handleQuery = () => {
        const query = document.getElementById('sql-query').value.trim().toLowerCase();
        const tableAName = tableAHeader.textContent.toLowerCase();
        const tableBName = tableBHeader.textContent.toLowerCase();
    
        // Reset all dots to gray
        const allDots = document.querySelectorAll('.dot');
        allDots.forEach(dot => {
            dot.classList.remove('joined', 'intersection', 'selected');
            dot.classList.add('gray');
        });
    
        // Check for table selection and conditions
        const selectTableRegex = /select\s+\*\s+from\s+(\w+)/;
        const whereConditionRegex = /where\s+(\w+)\s*=\s*(\w+)/;
    
        const tableMatch = query.match(selectTableRegex);
        let tableName, conditionColumn, conditionValue;
        if (tableMatch) {
            tableName = tableMatch[1].toLowerCase();
    
            // Highlight the dots of the selected table
            if (tableName === tableAName) {
                document.querySelectorAll('#dots-a .dot').forEach(dot => dot.classList.add('joined'));
            } else if (tableName === tableBName) {
                document.querySelectorAll('#dots-b .dot').forEach(dot => dot.classList.add('joined'));
            }
        }
    
        const conditionMatch = query.match(whereConditionRegex);
        if (conditionMatch) {
            conditionColumn = conditionMatch[1].toUpperCase();
            conditionValue = conditionMatch[2].toUpperCase();
    
            // Highlight dots based on the condition
            if (tableName === tableAName) {
                document.querySelectorAll('#dots-a .dot').forEach(dot => {
                    if (dot.dataset.column === conditionColumn && dot.textContent.toUpperCase() === conditionValue) {
                        dot.classList.add('selected');
                    } else if (dot.dataset.column === conditionColumn) {
                        dot.classList.remove('joined');
                        dot.classList.add('gray');
                    }
                });
            } else if (tableName === tableBName) {
                document.querySelectorAll('#dots-b .dot').forEach(dot => {
                    if (dot.dataset.column === conditionColumn && dot.textContent.toUpperCase() === conditionValue) {
                        dot.classList.add('selected');
                    } else if (dot.dataset.column === conditionColumn) {
                        dot.classList.remove('joined');
                        dot.classList.add('gray');
                    }
                });
            }
        }
    };
    

    // Initialize with random table and column names
    updateTable();

    document.getElementById('execute-query').addEventListener('click', handleQuery); // Button click event
});
