function getRowDiffs(rows, newRows) {
            var item, r, eitherIsNonData, diff = [];
            var from = 0, to = Math.max(newRows.length, rows.length);
            if (refreshHints && refreshHints.ignoreDiffsBefore) {
                from = Math.max(0, Math.min(newRows.length, refreshHints.ignoreDiffsBefore));
            }
            if (refreshHints && refreshHints.ignoreDiffsAfter) {
                to = Math.min(newRows.length, Math.max(0, refreshHints.ignoreDiffsAfter));
            }
            for (var i = from, rl = rows.length; i < to; i++) {
                if (i >= rl) {
                    diff[diff.length] = i;
                }
                else {
                    item = newRows[i];
                    r = rows[i];
                    if (!item || (groupingInfos.length && (eitherIsNonData = (item.__nonDataRow) || (r.__nonDataRow)) &&
                        item.__group !== r.__group ||
                        item.__group && !item.equals(r))
                        || (eitherIsNonData &&
                            // no good way to compare totals since they are arbitrary DTOs
                            // deep object comparison is pretty expensive
                            // always considering them 'dirty' seems easier for the time being
                            (item.__groupTotals || r.__groupTotals))
                        || item[idProperty] != r[idProperty]
                        || (updated && updated[item[idProperty]])) {
                        diff[diff.length] = i;
                    }
                }
            }
            return diff;
        }