function renderPagination()
{
    if (this.options.navigation !== 0)
    {
        var selector = getCssSelector(this.options.css.pagination),
            paginationItems = findFooterAndHeaderItems.call(this, selector)._bgShowAria(this.rowCount !== -1);

        if (this.rowCount !== -1 && paginationItems.length > 0)
        {
            var tpl = this.options.templates,
                current = this.current,
                totalPages = this.totalPages,
                pagination = $(tpl.pagination.resolve(getParams.call(this))),
                offsetRight = totalPages - current,
                offsetLeft = (this.options.padding - current) * -1,
                startWith = ((offsetRight >= this.options.padding) ?
                    Math.max(offsetLeft, 1) :
                    Math.max((offsetLeft - this.options.padding + offsetRight), 1)),
                maxCount = this.options.padding * 2 + 1,
                count = (totalPages >= maxCount) ? maxCount : totalPages;

            renderPaginationItem.call(this, pagination, "first", "&laquo;", "first")
                ._bgEnableAria(current > 1);
            renderPaginationItem.call(this, pagination, "prev", "&lt;", "prev")
                ._bgEnableAria(current > 1);

            for (var i = 0; i < count; i++)
            {
                var pos = i + startWith;
                renderPaginationItem.call(this, pagination, pos, pos, "page-" + pos)
                    ._bgEnableAria()._bgSelectAria(pos === current);
            }

            if (count === 0)
            {
                renderPaginationItem.call(this, pagination, 1, 1, "page-" + 1)
                    ._bgEnableAria(false)._bgSelectAria();
            }

            renderPaginationItem.call(this, pagination, "next", "&gt;", "next")
                ._bgEnableAria(totalPages > current);
            renderPaginationItem.call(this, pagination, "last", "&raquo;", "last")
                ._bgEnableAria(totalPages > current);

            replacePlaceHolder.call(this, paginationItems, pagination);
        }
    }
}