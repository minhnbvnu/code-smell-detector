function prepareTable()
{
    var tpl = this.options.templates,
        wrapper = (this.element.parent().hasClass(this.options.css.responsiveTable)) ?
            this.element.parent() : this.element;

    this.element.addClass(this.options.css.table);

    // checks whether there is an tbody element; otherwise creates one
    if (this.element.children("tbody").length === 0)
    {
        this.element.append(tpl.body);
    }

    if (this.options.navigation & 1)
    {
        this.header = $(tpl.header.resolve(getParams.call(this, { id: this.element._bgId() + "-header" })));
        wrapper.before(this.header);
    }

    if (this.options.navigation & 2)
    {
        this.footer = $(tpl.footer.resolve(getParams.call(this, { id: this.element._bgId() + "-footer" })));
        wrapper.after(this.footer);
    }
}