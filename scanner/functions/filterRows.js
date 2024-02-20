function filterRows(rows, filters, data) {
    let filteredRowIndices = [];

    if (Object.keys(filters).length === 0) {
        return rows.map(row => row.meta.rowIndex);
    }

    for (let colIndex in filters) {
        const keyword = filters[colIndex];

        const filteredRows = filteredRowIndices.length ?
            filteredRowIndices.map(i => rows[i]) :
            rows;

        const cells = filteredRows.map(row => row[colIndex]);

        let filter = guessFilter(keyword);
        let filterMethod = getFilterMethod(rows, data, filter);

        if (filterMethod) {
            filteredRowIndices = filterMethod(filter.text, cells);
        } else {
            filteredRowIndices = cells.map(cell => cell.rowIndex);
        }
    }

    return filteredRowIndices;
}