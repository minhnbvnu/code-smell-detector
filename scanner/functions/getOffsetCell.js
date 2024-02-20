function getOffsetCell(row, col, handsOnTableID) {
    return $('#' + handsOnTableID + " tr:eq(" + (row + 1) + ") td[data-column=" + col + "]");
}