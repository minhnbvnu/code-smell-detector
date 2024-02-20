function getFilterMethod(rows, allData, filter) {
    const getFormattedValue = cell => {
        let formatter = CellManager.getCustomCellFormatter(cell);
        let rowData = rows[cell.rowIndex];
        if (allData && allData.data && allData.data.length) {
            rowData = allData.data[cell.rowIndex];
        }
        if (formatter && cell.content) {
            cell.html = formatter(cell.content, rows[cell.rowIndex], cell.column, rowData, filter);
            return stripHTML(cell.html);
        }
        return cell.content || '';
    };

    const stringCompareValue = cell =>
        String(stripHTML(cell.html || '') || getFormattedValue(cell)).toLowerCase();

    const numberCompareValue = cell => parseFloat(cell.content);

    const getCompareValues = (cell, keyword) => {
        if (cell.column.compareValue) {
            const compareValues = cell.column.compareValue(cell, keyword);
            if (compareValues && Array.isArray(compareValues)) return compareValues;
        }

        // check if it can be converted to number
        const float = numberCompareValue(cell);
        if (!isNaN(float)) {
            return [float, keyword];
        }

        return [stringCompareValue(cell), keyword];
    };

    let filterMethodMap = {
        contains(keyword, cells) {
            return cells
                .filter(cell => {
                    const hay = stringCompareValue(cell);
                    const needle = (keyword || '').toLowerCase();
                    return !needle || hay.includes(needle);
                })
                .map(cell => cell.rowIndex);
        },

        greaterThan(keyword, cells) {
            return cells
                .filter(cell => {
                    const [compareValue, keywordValue] = getCompareValues(cell, keyword);
                    return compareValue > keywordValue;
                })
                .map(cell => cell.rowIndex);
        },

        lessThan(keyword, cells) {
            return cells
                .filter(cell => {
                    const [compareValue, keywordValue] = getCompareValues(cell, keyword);
                    return compareValue < keywordValue;
                })
                .map(cell => cell.rowIndex);
        },

        equals(keyword, cells) {
            return cells
                .filter(cell => {
                    const value = parseFloat(cell.content);
                    return value === keyword;
                })
                .map(cell => cell.rowIndex);
        },

        notEquals(keyword, cells) {
            return cells
                .filter(cell => {
                    const value = parseFloat(cell.content);
                    return value !== keyword;
                })
                .map(cell => cell.rowIndex);
        },

        range(rangeValues, cells) {
            return cells
                .filter(cell => {
                    const values1 = getCompareValues(cell, rangeValues[0]);
                    const values2 = getCompareValues(cell, rangeValues[1]);
                    const value = values1[0];
                    return value >= values1[1] && value <= values2[1];
                })
                .map(cell => cell.rowIndex);
        },

        containsNumber(keyword, cells) {
            return cells
                .filter(cell => {
                    let number = parseFloat(keyword, 10);
                    let string = keyword;
                    let hayNumber = numberCompareValue(cell);
                    let hayString = stringCompareValue(cell);

                    return number === hayNumber || hayString.includes(string);
                })
                .map(cell => cell.rowIndex);
        }
    };

    return filterMethodMap[filter.type];
}