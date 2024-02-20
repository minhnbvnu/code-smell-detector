function renderPaginationItem(list, page, text, markerCss)
{
    var that = this,
        tpl = this.options.templates,
        css = this.options.css,
        values = getParams.call(this, { css: markerCss, text: text, page: page }),
        item = $(tpl.paginationItem.resolve(values))
            .on("click" + namespace, getCssSelector(css.paginationButton), function (e)
            {
                e.stopPropagation();
                e.preventDefault();

                var $this = $(this),
                    parent = $this.parent();
                if (!parent.hasClass("active") && !parent.hasClass("disabled"))
                {
                    var commandList = {
                        first: 1,
                        prev: that.current - 1,
                        next: that.current + 1,
                        last: that.totalPages
                    };
                    var command = $this.data("page");
                    that.current = commandList[command] || command;
                    loadData.call(that);
                }
                $this.trigger("blur");
            });

    list.append(item);
    return item;
}