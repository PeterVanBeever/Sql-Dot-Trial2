// queryUtils.js
import { startGame } from './game.js';

export function handleQuery(query, tableAName, tableBName, tableAHeader, tableBHeader) {
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
        
        if (!query.match(whereConditionRegex)) {
            if (tableName === tableAName) {
                document.querySelectorAll('#dots-a .dot').forEach(dot => dot.classList.add('joined'));
            } else if (tableName === tableBName) {
                document.querySelectorAll('#dots-b .dot').forEach(dot => dot.classList.add('joined'));
            }
        }
    }

    const conditionMatch = query.match(whereConditionRegex);
    if (conditionMatch) {
        conditionColumn = conditionMatch[1].toUpperCase();
        conditionValue = conditionMatch[2].toUpperCase();

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
}
