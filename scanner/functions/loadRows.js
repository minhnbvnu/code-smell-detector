function loadRows()
{
    if (!this.options.ajax)
    {
        var that = this,
            rows = this.element.find("tbody > tr");

        rows.each(function ()
        {
            var $this = $(this),
                cells = $this.children("td"),
                row = {};

            $.each(that.columns, function (i, column)
            {
                row[column.id] = column.converter.from(cells.eq(i).text());
            });

            appendRow.call(that, row);
        });

        setTotals.call(this, this.rows.length);
        sortRows.call(this);
    }
}