function renderInfos()
{
    if (this.options.navigation !== 0)
    {
        var selector = getCssSelector(this.options.css.infos),
            infoItems = findFooterAndHeaderItems.call(this, selector);

        if (infoItems.length > 0)
        {
            var end = (this.current * this.rowCount),
                infos = $(this.options.templates.infos.resolve(getParams.call(this, {
                    end: (this.total === 0 || end === -1 || end > this.total) ? this.total : end,
                    start: (this.total === 0) ? 0 : (end - this.rowCount + 1),
                    total: this.total
                })));

            replacePlaceHolder.call(this, infoItems, infos);
        }
    }
}