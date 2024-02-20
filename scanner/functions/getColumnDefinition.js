function getColumnDefinition() {
            return {
                id: _options.columnId,
                name: (_options.hideSelectAllCheckbox || _options.hideInColumnTitleRow) ? "" : "<input id='header-selector" + _selectAll_UID + "' type='checkbox'><label for='header-selector" + _selectAll_UID + "'></label>",
                toolTip: (_options.hideSelectAllCheckbox || _options.hideInColumnTitleRow) ? "" : _options.toolTip,
                field: "sel",
                width: _options.width,
                resizable: false,
                sortable: false,
                cssClass: _options.cssClass,
                hideSelectAllCheckbox: _options.hideSelectAllCheckbox,
                formatter: checkboxSelectionFormatter
            };
        }