function renderRowCountSelection(actions)
{
    var that = this,
        rowCountList = this.options.rowCount;

    function getText(value)
    {
        return (value === -1) ? that.options.labels.all : value;
    }

    if ($.isArray(rowCountList))
    {
        var css = this.options.css,
            tpl = this.options.templates,
            dropDown = $(tpl.actionDropDown.resolve(getParams.call(this, { content: getText(this.rowCount) }))),
            menuSelector = getCssSelector(css.dropDownMenu),
            menuTextSelector = getCssSelector(css.dropDownMenuText),
            menuItemsSelector = getCssSelector(css.dropDownMenuItems),
            menuItemSelector = getCssSelector(css.dropDownItemButton);

        $.each(rowCountList, function (index, value)
        {
            var item = $(tpl.actionDropDownItem.resolve(getParams.call(that,
                { text: getText(value), action: value })))
                    ._bgSelectAria(value === that.rowCount)
                    .on("click" + namespace, menuItemSelector, function (e)
                    {
                        e.preventDefault();

                        var $this = $(this),
                            newRowCount = $this.data("action");
                        if (newRowCount !== that.rowCount)
                        {
                            // todo: sophisticated solution needed for calculating which page is selected
                            that.current = 1; // that.rowCount === -1 ---> All
                            that.rowCount = newRowCount;
                            $this.parents(menuItemsSelector).children().each(function ()
                            {
                                var $item = $(this),
                                    currentRowCount = $item.find(menuItemSelector).data("action");
                                $item._bgSelectAria(currentRowCount === newRowCount);
                            });
                            $this.parents(menuSelector).find(menuTextSelector).text(getText(newRowCount));
                            loadData.call(that);
                        }
                    });
            dropDown.find(menuItemsSelector).append(item);
        });
        actions.append(dropDown);
    }
}