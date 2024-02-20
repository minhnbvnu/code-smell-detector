function setTableHeaderSortDirection(element)
{
    var css = this.options.css,
        iconSelector = getCssSelector(css.icon),
        columnId = element.data("column-id") || element.parents("th").first().data("column-id"),
        sortOrder = this.sortDictionary[columnId],
        icon = element.find(iconSelector);

    if (!this.options.multiSort)
    {
        element.parents("tr").first().find(iconSelector).removeClass(css.iconDown + " " + css.iconUp);
        this.sortDictionary = {};
    }

    if (sortOrder && sortOrder === "asc")
    {
        this.sortDictionary[columnId] = "desc";
        icon.removeClass(css.iconUp).addClass(css.iconDown);
    }
    else if (sortOrder && sortOrder === "desc")
    {
        if (this.options.multiSort)
        {
            var newSort = {};
            for (var key in this.sortDictionary)
            {
                if (key !== columnId)
                {
                    newSort[key] = this.sortDictionary[key];
                }
            }
            this.sortDictionary = newSort;
            icon.removeClass(css.iconDown);
        }
        else
        {
            this.sortDictionary[columnId] = "asc";
            icon.removeClass(css.iconDown).addClass(css.iconUp);
        }
    }
    else
    {
        this.sortDictionary[columnId] = "asc";
        icon.addClass(css.iconUp);
    }
}