function searchRows(searchOptions, rows, selectedMatchIndex) {
    return rows.reduce((searchResult, row) => {
        const rowSearchResult = row.d.reduce((rowSearchResult, column) => {
            const columnSearchResult = searchDatum(
                searchOptions,
                column,
                rowSearchResult.matchCount,
                selectedMatchIndex
            );

            rowSearchResult.isRowMatch = rowSearchResult.isRowMatch || columnSearchResult.isRowMatch;
            rowSearchResult.d.push(columnSearchResult.output);
            rowSearchResult.matchCount = columnSearchResult.matchCount;

            return rowSearchResult;
        }, {
            d: [],
            isRowMatch: false,
            matchCount: searchResult.matchCount,
        });

        searchResult.rows.push({
            d: rowSearchResult.d,
            k: row.k,
            meta: {
                isMatch: rowSearchResult.isRowMatch,
            },
        });

        if (rowSearchResult.isRowMatch && searchResult.selectedRow === null) {
            searchResult.selectedRow = row;
        }
        searchResult.matchCount = rowSearchResult.matchCount;

        return searchResult;
    }, {
        rows: [],
        selectedRow: null,
        matchCount: 0,
    });
}