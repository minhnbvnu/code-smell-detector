function tableHeader(maxNameCols, missingWidth) {
    const elements = [];
    elements.push(formatName('File', maxNameCols, 0));
    elements.push(formatPct('% Stmts'));
    elements.push(formatPct('% Branch', PCT_COLS + 1));
    elements.push(formatPct('% Funcs'));
    elements.push(formatPct('% Lines'));
    elements.push(formatName('Uncovered Line #s', missingWidth));
    return elements.join(DELIM) + ' ';
}