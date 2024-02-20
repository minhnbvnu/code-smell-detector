function defaultGroupCellFormatter(row, cell, value, columnDef, item, grid) {
            if (!options.enableExpandCollapse) {
                return item.title;
            }
            var indentation = item.level * 15 + "px";
            return (options.checkboxSelect ? '<span class="' + options.checkboxSelectCssClass +
                ' ' + (item.selectChecked ? 'checked' : 'unchecked') + '"></span>' : '') +
                "<span class='" + options.toggleCssClass + " " +
                (item.collapsed ? options.toggleCollapsedCssClass : options.toggleExpandedCssClass) +
                "' style='margin-left:" + indentation + "'>" +
                "</span>" +
                "<span class='" + options.groupTitleCssClass + "' level='" + item.level + "'>" +
                item.title +
                "</span>";
        }