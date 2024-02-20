function updateSelectedMatch(rows, selectedMatchIndex) {
    return rows.reduce((updateResult, row) => {
        const updateRowResult = row.d.reduce((updateRowResult, output) => {
            if (typeOf(output) === 'array') {
                const updateColumnResult = output.reduce((updateColumnResult, token) => {
                    updateColumnResult.isRowSelected = updateColumnResult.isRowSelected || token.matchIndex === selectedMatchIndex;

                    updateColumnResult.tokens.push(Object.assign({}, token, {
                        isMatchSelected: token.matchIndex === selectedMatchIndex,
                    }));

                    return updateColumnResult;
                }, {
                    isRowSelected: false,
                    tokens: [],
                });

                updateRowResult.d.push(updateColumnResult.tokens);
                updateRowResult.isRowSelected = updateColumnResult.isRowSelected;

            } else {
                updateRowResult.d.push(output);
            }

            return updateRowResult;
        }, {
            isRowSelected: false,
            d: [],
        });

        const newRow = Object.assign({}, row, {
            d: updateRowResult.d,
        });

        if (updateRowResult.isRowSelected && updateResult.selectedRow === null) {
            updateResult.selectedRow = newRow;
        }

        updateResult.rows.push(newRow);

        return updateResult;
    }, {
        rows: [],
        selectedRow: null,
    });
}