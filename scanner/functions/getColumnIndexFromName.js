function getColumnIndexFromName(table, targetColumnName) {
    return getArrayIndexOfSubstring(table.handsontable('getColHeader'), targetColumnName);
}