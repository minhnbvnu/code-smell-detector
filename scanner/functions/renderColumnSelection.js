function renderColumnSelection(actions)
{
    if (this.options.columnSelection && this.columns.length > 1)
    {
        var that = this,
            css = this.options.css,
            tpl = this.options.templates,
            icon = tpl.icon.resolve(getParams.call(this, { iconCss: css.iconColumns })),
            dropDown = $(tpl.actionDropDown.resolve(getParams.call(this, { content: icon }))),
            selector = getCssSelector(css.dropDownItem),
            checkboxSelector = getCssSelector(css.dropDownItemCheckbox),
            itemsSelector = getCssSelector(css.dropDownMenuItems);

        $.each(this.columns, function (i, column)
        {
            if (column.visibleInSelection)
            {
                var item = $(tpl.actionDropDownCheckboxItem.resolve(getParams.call(that,
                    { name: column.id, label: column.text, checked: column.visible })))
                        .on("click" + namespace, selector, function (e)
                        {
                            e.stopPropagation();
    
                            var $this = $(this),
                                checkbox = $this.find(checkboxSelector);
                            if (!checkbox.prop("disabled"))
                            {
                                column.visible = checkbox.prop("checked");
                                var enable = that.columns.where(isVisible).length > 1;
                                $this.parents(itemsSelector).find(selector + ":has(" + checkboxSelector + ":checked)")
                                    ._bgEnableAria(enable).find(checkboxSelector)._bgEnableField(enable);
    
                                that.element.find("tbody").empty(); // Fixes an column visualization bug
                                renderTableHeader.call(that);
                                loadData.call(that);
                            }
                        });
                dropDown.find(getCssSelector(css.dropDownMenuItems)).append(item);
            }
        });
        actions.append(dropDown);
    }
}