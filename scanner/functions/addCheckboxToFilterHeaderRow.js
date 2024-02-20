function addCheckboxToFilterHeaderRow(grid) {
            _handler.subscribe(grid.onHeaderRowCellRendered, function (e, args) {
                if (args.column.field === "sel") {
                    $(args.node).empty();
                    $("<span id='filter-checkbox-selectall-container'><input id='header-filter-selector" + _selectAll_UID + "' type='checkbox'><label for='header-filter-selector" + _selectAll_UID + "'></label></span>")
                        .appendTo(args.node)
                        .on('click', function (evnt) {
                        handleHeaderClick(evnt, args);
                    });
                }
            });
        }