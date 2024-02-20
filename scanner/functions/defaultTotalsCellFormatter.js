function defaultTotalsCellFormatter(row, cell, value, columnDef, item, grid) {
            return (columnDef.groupTotalsFormatter && columnDef.groupTotalsFormatter(item, columnDef, grid)) || "";
        }