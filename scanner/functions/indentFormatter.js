function indentFormatter(formatter, indent) {
        return (row, cell, value, columnDef, dataContext) => {
            const spacer = (0, dom_1.span)({
                class: "slick-group-toggle",
                style: { "margin-left": `${(indent !== null && indent !== void 0 ? indent : 0) * 15}px` },
            });
            const formatted = formatter != null ? formatter(row, cell, value, columnDef, dataContext) : `${value}`;
            return `${spacer.outerHTML}${formatted.replace(/^<div/, "<span").replace(/div>$/, "span>")}`;
        };
    }