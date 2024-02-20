function renderSearchField()
{
    if (this.options.navigation !== 0)
    {
        var css = this.options.css,
            selector = getCssSelector(css.search),
            searchItems = findFooterAndHeaderItems.call(this, selector);

        if (searchItems.length > 0)
        {
            var that = this,
                tpl = this.options.templates,
                timer = null, // fast keyup detection
                currentValue = "",
                searchFieldSelector = getCssSelector(css.searchField),
                search = $(tpl.search.resolve(getParams.call(this))),
                searchField = (search.is(searchFieldSelector)) ? search :
                    search.find(searchFieldSelector);

            searchField.on("keyup" + namespace, function (e)
            {
                e.stopPropagation();
                var newValue = $(this).val();
                if (currentValue !== newValue || (e.which === 13 && newValue !== ""))
                {
                    currentValue = newValue;
                    if (e.which === 13 || newValue.length === 0 || newValue.length >= that.options.searchSettings.characters)
                    {
                        window.clearTimeout(timer);
                        timer = window.setTimeout(function ()
                        {
                            executeSearch.call(that, newValue);
                        }, that.options.searchSettings.delay);
                    }
                }
            });

            replacePlaceHolder.call(this, searchItems, search);
        }
    }
}