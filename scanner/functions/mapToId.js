function mapToId(columns) {
            columns
                .forEach(function (column) {
                columnsById[column.id] = column;
                if (column.columns)
                    mapToId(column.columns);
            });
        }