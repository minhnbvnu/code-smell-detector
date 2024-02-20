function getTotalsRowMetadata(item) {
            var groupLevel = item && item.group && item.group.level;
            return {
                selectable: false,
                focusable: options.totalsFocusable,
                cssClasses: options.totalsCssClass + ' slick-group-level-' + groupLevel,
                formatter: options.totalsFormatter,
                editor: null
            };
        }