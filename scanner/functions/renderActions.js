function renderActions()
{
    if (this.options.navigation !== 0)
    {
        var css = this.options.css,
            selector = getCssSelector(css.actions),
            actionItems = findFooterAndHeaderItems.call(this, selector);

        if (actionItems.length > 0)
        {
            var that = this,
                tpl = this.options.templates,
                actions = $(tpl.actions.resolve(getParams.call(this)));

            // Refresh Button
            if (this.options.ajax)
            {
                var refreshIcon = tpl.icon.resolve(getParams.call(this, { iconCss: css.iconRefresh })),
                    refresh = $(tpl.actionButton.resolve(getParams.call(this,
                    { content: refreshIcon, text: this.options.labels.refresh })))
                        .on("click" + namespace, function (e)
                        {
                            // todo: prevent multiple fast clicks (fast click detection)
                            e.stopPropagation();
                            that.current = 1;
                            loadData.call(that);
                        });
                actions.append(refresh);
            }

            // Row count selection
            renderRowCountSelection.call(this, actions);

            // Column selection
            renderColumnSelection.call(this, actions);

            replacePlaceHolder.call(this, actionItems, actions);
        }
    }
}