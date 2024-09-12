import { getRandomData } from './dataUtils.js';

export function updateTableUI(columnsA, columnsB, tableAName, tableBName, tableAHeader, tableBHeader, tableAColumns, tableBColumns, tableADots, tableBDots, joinData = [], whereConditions = []) {
    tableAHeader.textContent = tableAName;
    tableBHeader.textContent = tableBName;

    tableAColumns.innerHTML = columnsA.map(col => `<div class="column-name">${col.name}</div>`).join('');
    tableBColumns.innerHTML = columnsB.map(col => `<div class="column-name">${col.name}</div>`).join('');

    tableADots.innerHTML = Array.from({ length: 100 }).map((_, i) => {
        const colIndex = i % columnsA.length;
        const data = getRandomData(columnsA[colIndex].type);
        return `<div class="dot" data-table="a" data-column="${columnsA[colIndex].name}" data-id="${i}">${data}</div>`;
    }).join('');

    tableBDots.innerHTML = Array.from({ length: 100 }).map((_, i) => {
        const colIndex = i % columnsB.length;
        const data = getRandomData(columnsB[colIndex].type);
        return `<div class="dot" data-table="b" data-column="${columnsB[colIndex].name}" data-id="${i}">${data}</div>`;
    }).join('');

    // Set all dots to gray by default
    setAllDotsGray();

    // Highlight dots based on join data if provided
    if (joinData.length > 0) {
        highlightJoinData(joinData);
    }

    // Highlight dots based on WHERE conditions if provided
    if (whereConditions.length > 0) {
        highlightWhereConditions(whereConditions);
    }
}

function highlightJoinData(joinData) {
    joinData.forEach(({ table, column, value }) => {
        document.querySelectorAll(`.dot[data-table="${table}"][data-column="${column}"]`).forEach(dot => {
            if (dot.textContent === value) {
                dot.classList.add('highlight');
            }
        });
    });
}

function highlightWhereConditions(whereConditions) {
    whereConditions.forEach(({ table, column, value }) => {
        document.querySelectorAll(`.dot[data-table="${table}"][data-column="${column}"]`).forEach(dot => {
            if (dot.textContent === value) {
                dot.classList.add('highlight');
            }
        });
    });
}

export function setAllDotsGray() {
    const allDots = document.querySelectorAll('.dot');
    allDots.forEach(dot => dot.classList.add('gray'));
}
