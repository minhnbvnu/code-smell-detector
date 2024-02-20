function makeLine(nameWidth, missingWidth) {
    const name = padding(nameWidth, '-');
    const pct = padding(PCT_COLS, '-');
    const elements = [];

    elements.push(name);
    elements.push(pct);
    elements.push(padding(PCT_COLS + 1, '-'));
    elements.push(pct);
    elements.push(pct);
    elements.push(padding(missingWidth, '-'));
    return elements.join(DELIM.replace(/ /g, '-')) + '-';
}