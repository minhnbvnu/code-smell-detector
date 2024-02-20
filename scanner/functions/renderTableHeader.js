function renderTableHeader()
{
    var that = this,
        headerRow = this.element.find("thead > tr"),
        css = this.options.css,
        tpl = this.options.templates,
        html = "",
        sorting = this.options.sorting;

    if (this.selection)
    {
        var selectBox = (this.options.multiSelect) ?
            tpl.select.resolve(getParams.call(that, { type: "checkbox", value: "all" })) : "";
        html += tpl.rawHeaderCell.resolve(getParams.call(that, { content: selectBox,
            css: css.selectCell }));
    }

    $.each(this.columns, function (index, column)
    {
        if (column.visible)
        {
            var sortOrder = that.sortDictionary[column.id],
                iconCss = ((sorting && sortOrder && sortOrder === "asc") ? css.iconUp :
                    (sorting && sortOrder && sortOrder === "desc") ? css.iconDown : ""),
                icon = tpl.icon.resolve(getParams.call(that, { iconCss: iconCss })),
                align = column.headerAlign,
                cssClass = (column.headerCssClass.length > 0) ? " " + column.headerCssClass : "";
            html += tpl.headerCell.resolve(getParams.call(that, {
                column: column, icon: icon, sortable: sorting && column.sortable && css.sortable || "",
                css: ((align === "right") ? css.right : (align === "center") ?
                    css.center : css.left) + cssClass,
                style: (column.width == null) ? "" : "width:" + column.width + ";" }));
        }
    });

    headerRow.html(html);

    if (sorting)
    {
        var sortingSelector = getCssSelector(css.sortable);
        headerRow.off("click" + namespace, sortingSelector)
            .on("click" + namespace, sortingSelector, function (e)
            {
                e.preventDefault();

                setTableHeaderSortDirection.call(that, $(this));
                sortRows.call(that);
                loadData.call(that);
            });
    }

    // todo: create a own function for that piece of code
    if (this.selection && this.options.multiSelect)
    {
        var selectBoxSelector = getCssSelector(css.selectBox);
        headerRow.off("click" + namespace, selectBoxSelector)
            .on("click" + namespace, selectBoxSelector, function(e)
            {
                e.stopPropagation();

                if ($(this).prop("checked"))
                {
                    that.select();
                }
                else
                {
                    that.deselect();
                }
            });
    }
}