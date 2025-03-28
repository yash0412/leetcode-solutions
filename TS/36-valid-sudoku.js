"use strict";
function isValidSudoku(board) {
    const maps = {
        row: {},
        column: {},
        subMatrix: {},
    };
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '.') {
                continue;
            }
            const num = parseInt(board[i][j]);
            const rowIndex = i;
            const columnIndex = j;
            const subMatrixIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if (!maps.row[rowIndex]) {
                maps.row[rowIndex] = new Set();
            }
            if (!maps.column[columnIndex]) {
                maps.column[columnIndex] = new Set();
            }
            if (!maps.subMatrix[subMatrixIndex]) {
                maps.subMatrix[subMatrixIndex] = new Set();
            }
            const isDuplicate = maps.row[rowIndex].has(num) ||
                maps.column[columnIndex].has(num) ||
                maps.subMatrix[subMatrixIndex].has(num);
            if (num < 0 || num > 9 || isDuplicate) {
                return false;
            }
            maps.row[rowIndex].add(num);
            maps.column[columnIndex].add(num);
            maps.subMatrix[subMatrixIndex].add(num);
        }
    }
    return true;
}
console.log(isValidSudoku([
    ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
]));
