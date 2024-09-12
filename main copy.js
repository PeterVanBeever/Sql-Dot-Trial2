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
        const { columnsA, columnsB } = getRandomColumnNames();
        const randomTableNames = [...tableNames];
        
        let tableAName, tableBName;
        do {
            tableAName = randomTableNames[Math.floor(Math.random() * randomTableNames.length)];
            tableBName = randomTableNames[Math.floor(Math.random() * randomTableNames.length)];
        } while (tableAName === tableBName);

        updateTableUI(columnsA, columnsB, tableAName, tableBName, tableAHeader, tableBHeader, tableAColumns, tableBColumns, tableADots, tableBDots);

        // Initialize the game after updating the table
        startGame(); 
    }

    function handleQueryInput() {
        const query = queryInput.value.trim().toLowerCase();
        const tableAName = tableAHeader.textContent.toLowerCase();
        const tableBName = tableBHeader.textContent.toLowerCase();

        if (checkGame(query)) {
            showAnimation(); // Trigger animation if correct
            updateTable(); // Start a new game when correct
        } else {
            handleQuery(query, tableAName, tableBName, tableAHeader, tableBHeader);
        }
    }

    // Initialize with random table and column names
    updateTable();

    // Add input event listener to the query input field
    queryInput.addEventListener('input', handleQueryInput);
});
