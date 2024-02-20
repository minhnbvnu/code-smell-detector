function registerRowEvents(tbody)
{
    var that = this,
        selectBoxSelector = getCssSelector(this.options.css.selectBox);

    if (this.selection)
    {
        tbody.off("click" + namespace, selectBoxSelector)
            .on("click" + namespace, selectBoxSelector, function(e)
            {
                e.stopPropagation();

                var $this = $(this),
                    id = that.converter.from($this.val());

                if ($this.prop("checked"))
                {
                    that.select([id]);
                }
                else
                {
                    that.deselect([id]);
                }
            });
    }

    tbody.off("click" + namespace, "> tr")
        .on("click" + namespace, "> tr", function(e)
        {
            e.stopPropagation();

            var $this = $(this),
                id = (that.identifier == null) ? $this.data("row-id") :
                    that.converter.from($this.data("row-id") + ""),
                row = (that.identifier == null) ? that.currentRows[id] :
                    that.currentRows.first(function (item) { return item[that.identifier] === id; });

            if (that.selection && that.options.rowSelect)
            {
                if ($this.hasClass(that.options.css.selected))
                {
                    that.deselect([id]);
                }
                else
                {
                    that.select([id]);
                }
            }

            that.element.trigger("click" + namespace, [that.columns, row]);
        });
}