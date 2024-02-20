function flattenGroupedRows(groups, level) {
            level = level || 0;
            var gi = groupingInfos[level];
            var groupedRows = [], rows, gl = 0, g;
            for (var i = 0, l = groups.length; i < l; i++) {
                g = groups[i];
                groupedRows[gl++] = g;
                if (!g.collapsed) {
                    rows = g.groups ? flattenGroupedRows(g.groups, level + 1) : g.rows;
                    for (var j = 0, jj = rows.length; j < jj; j++) {
                        groupedRows[gl++] = rows[j];
                    }
                }
                if (g.totals && gi.displayTotalsRow && (!g.collapsed || gi.aggregateCollapsed)) {
                    groupedRows[gl++] = g.totals;
                }
            }
            return groupedRows;
        }