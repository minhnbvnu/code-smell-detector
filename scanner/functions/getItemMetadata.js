function getItemMetadata(i) {
            var item = rows[i];
            if (item === undefined) {
                return null;
            }
            // overrides for grouping rows
            if (item.__group) {
                return options.groupItemMetadataProvider.getGroupRowMetadata(item);
            }
            // overrides for totals rows
            if (item.__groupTotals) {
                return options.groupItemMetadataProvider.getTotalsRowMetadata(item);
            }
            return null;
        }