import { getRandomColumnNames } from './dataUtils.js';
import { updateTableUI } from './uiUtils.js';
import { handleQuery } from './queryUtils.js';
import { showAnimation } from './animation.js';
import { tableNames } from './dataUtils.js'; // Import tableNames if used
import { startGame, checkGame } from './game.js'; // Import game functions

document.addEventListener('DOMContentLoaded', function () {
    const tableAColumns = document.getElementById('column-names-a');
    const tableBColumns = document.getElementById('column-names-b');
    const tableADots = document.getElementById('dots-a');
    const tableBDots = document.getElementById('dots-b');
    const tableAHeader = document.querySelector('#table-a h2');
    const tableBHeader = document.querySelector('#table-b h2');
    const queryInput = document.getElementById('sql-query');

    function updateTable() {
        // Generate random columns for both tables, including primary and foreign keys
        const { columnsA, columnsB } = getRandomColumnNames();
        const randomTableNames = [...tableNames];

        // Randomly assign table names ensuring they're different
        let tableAName, tableBName;
        do {
            tableAName = randomTableNames[Math.floor(Math.random() * randomTableNames.length)];
            tableBName = randomTableNames[Math.floor(Math.random() * randomTableNames.length)];
        } while (tableAName === tableBName);

        // Update the UI with the new table data
        updateTableUI(columnsA, columnsB, tableAName, tableBName, tableAHeader, tableBHeader, tableAColumns, tableBColumns, tableADots, tableBDots);

        // Initialize the game logic after the table is built
        startGame(); 
    }

    function handleQueryInput() {
        const query = queryInput.value.trim().toLowerCase();
        const tableAName = tableAHeader.textContent.toLowerCase();
        const tableBName = tableBHeader.textContent.toLowerCase();

        // Check if the query is correct
        if (checkGame(query)) {
            showAnimation(); // Show animation if the query is correct
            updateTable(); // Reset and start a new game when correct
        } else {
            handleQuery(query, tableAName, tableBName); // Handle query logic
        }
    }

    // Initialize the game and table on page load
    updateTable();

    // Listen for changes in the SQL query input field
    queryInput.addEventListener('input', handleQueryInput);
});
