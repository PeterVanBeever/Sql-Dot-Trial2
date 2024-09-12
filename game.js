import { getRandomColumnNames, getRandomData, tableNames } from './dataUtils.js';  // Adjust the path as necessary

let target = null;

function extractRenderedData(tableSelector) {
    const columns = [];
    const rows = document.querySelectorAll(`${tableSelector} .dot`);

    rows.forEach(dot => {
        const column = dot.dataset.column;
        const value = dot.textContent;
        if (!columns[column]) {
            columns[column] = [];
        }
        columns[column].push(value);
    });

    return columns;
}

function getValidTargetData(tableAData, tableBData, tableAName, tableBName) {
    const tables = [
        { name: tableAName, data: tableAData, id: 'a' },
        { name: tableBName, data: tableBData, id: 'b' }
    ];
    const randomTable = tables[Math.floor(Math.random() * tables.length)];
    const columns = Object.keys(randomTable.data);
    const randomColumn = columns[Math.floor(Math.random() * columns.length)];
    const randomColumnData = randomTable.data[randomColumn];

    const randomValue = randomColumnData[Math.floor(Math.random() * randomColumnData.length)];

    return {
        table: randomTable.id,
        column: randomColumn,
        value: randomValue,
        tableName: randomTable.name
    };
}

export function startGame() {
    // Extract the data after rendering
    const tableAData = extractRenderedData('#dots-a');
    const tableBData = extractRenderedData('#dots-b');

    // Get a valid target based on actual rendered data
    target = getValidTargetData(tableAData, tableBData, document.querySelector('#table-a h2').textContent, document.querySelector('#table-b h2').textContent);

    // Display the target message to the user
    document.getElementById('game-message').textContent = 
        `Target the '${target.value}' in column ${target.column} from ${target.tableName}.`;
}

export function checkGame(query) {
    const joinMatch = query.match(/join\s+(\w+)\s+on\s+(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
    const whereMatch = query.match(/where\s+(\w+)\s*=\s*['"]?(\w+)['"]?/);

    if (joinMatch && whereMatch) {
        const [ , joinTable, tableA, columnA, tableB, columnB] = joinMatch;
        const [ , columnName, columnValue ] = whereMatch;

        const correctTableNameA = target.tableName.toLowerCase();
        const correctTableNameB = joinTable.toLowerCase();
        const correctColumnA = target.column.toLowerCase();
        const correctColumnB = 'id'; // assuming we're joining on primary key 'ID'

        if (correctTableNameA === tableA.toLowerCase() && 
            correctTableNameB === tableB.toLowerCase() && 
            correctColumnA === columnA.toLowerCase() && 
            correctColumnB === columnB.toLowerCase() && 
            columnName.toLowerCase() === target.column.toLowerCase() && 
            columnValue.toUpperCase() === target.value) {
                document.getElementById('game-message').textContent = 'Correct! Well done!';
                return true;
        }
    }

    return false;
}

document.addEventListener('DOMContentLoaded', function () {
    function updateTable() {
        const { columnsA, columnsB } = getRandomColumnNames();

        let tableAName, tableBName;
        do {
            tableAName = tableNames[Math.floor(Math.random() * tableNames.length)];
            tableBName = tableNames[Math.floor(Math.random() * tableNames.length)];
        } while (tableAName === tableBName);

        updateTableUI(columnsA, columnsB, tableAName, tableBName, 
            document.querySelector('#table-a h2'), 
            document.querySelector('#table-b h2'), 
            document.getElementById('column-names-a'), 
            document.getElementById('column-names-b'), 
            document.getElementById('dots-a'), 
            document.getElementById('dots-b'));

        // Start the game after the table is built and rendered
        startGame();
    }

    // Initialize with random table and column names
    updateTable();

    document.getElementById('execute-query').addEventListener('click', () => {
        const query = document.getElementById('sql-query').value.trim().toLowerCase();
        if (checkGame(query)) {
            updateTable(); // Start a new game and update the table when correct
        }
    });
});
