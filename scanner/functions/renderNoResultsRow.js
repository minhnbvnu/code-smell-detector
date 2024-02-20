function renderNoResultsRow()
{
    var tbody = this.element.children("tbody").first(),
        tpl = this.options.templates,
        count = this.columns.where(isVisible).length;

    if (this.selection)
    {
        count = count + 1;
    }
    tbody.html(tpl.noResults.resolve(getParams.call(this, { columns: count })));
}