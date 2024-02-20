function groupCellFormatter(_row, _cell, _value, _columnDef, dataContext) {
        const { collapsed, level, title } = dataContext;
        const toggle = (0, dom_1.span)({
            class: `slick-group-toggle ${collapsed ? "collapsed" : "expanded"}`,
            style: { "margin-left": `${level * 15}px` },
        });
        const titleElement = (0, dom_1.span)({
            class: "slick-group-title",
            level,
        }, title);
        return `${toggle.outerHTML}${titleElement.outerHTML}`;
    }