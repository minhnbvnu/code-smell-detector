function recalc(_items) {
            rowsById = null;
            if (refreshHints.isFilterNarrowing != prevRefreshHints.isFilterNarrowing ||
                refreshHints.isFilterExpanding != prevRefreshHints.isFilterExpanding) {
                filterCache = [];
            }
            var filteredItems = getFilteredAndPagedItems(_items);
            totalRows = filteredItems.totalRows;
            var newRows = filteredItems.rows;
            groups = [];
            if (groupingInfos.length) {
                groups = extractGroups(newRows);
                if (groups.length) {
                    newRows = flattenGroupedRows(groups);
                }
            }
            var diff = getRowDiffs(rows, newRows);
            rows = newRows;
            return diff;
        }