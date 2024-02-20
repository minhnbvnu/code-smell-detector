function getGroupRowMetadata(item) {
            var groupLevel = item && item.level;
            return {
                selectable: false,
                focusable: options.groupFocusable,
                cssClasses: options.groupCssClass + ' slick-group-level-' + groupLevel,
                formatter: options.includeHeaderTotals && options.totalsFormatter,
                columns: {
                    0: {
                        colspan: options.includeHeaderTotals ? "1" : "*",
                        formatter: options.groupFormatter,
                        editor: null
                    }
                }
            };
        }