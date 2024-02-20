function loadColumns()
{
    var that = this,
        firstHeadRow = this.element.find("thead > tr").first(),
        sorted = false;

    /*jshint -W018*/
    firstHeadRow.children().each(function ()
    {
        var $this = $(this),
            data = $this.data(),
            column = {
                id: data.columnId,
                identifier: that.identifier == null && data.identifier || false,
                converter: that.options.converters[data.converter || data.type] || that.options.converters["string"],
                text: $this.text(),
                align: data.align || "left",
                headerAlign: data.headerAlign || "left",
                cssClass: data.cssClass || "",
                headerCssClass: data.headerCssClass || "",
                formatter: that.options.formatters[data.formatter] || null,
                order: (!sorted && (data.order === "asc" || data.order === "desc")) ? data.order : null,
                searchable: !(data.searchable === false), // default: true
                sortable: !(data.sortable === false), // default: true
                visible: !(data.visible === false), // default: true
                visibleInSelection: !(data.visibleInSelection === false), // default: true
                width: ($.isNumeric(data.width)) ? data.width + "px" : 
                    (typeof(data.width) === "string") ? data.width : null
            };
        that.columns.push(column);
        if (column.order != null)
        {
            that.sortDictionary[column.id] = column.order;
        }

        // Prevents multiple identifiers
        if (column.identifier)
        {
            that.identifier = column.id;
            that.converter = column.converter;
        }

        // ensures that only the first order will be applied in case of multi sorting is disabled
        if (!that.options.multiSort && column.order !== null)
        {
            sorted = true;
        }
    });
    /*jshint +W018*/
}