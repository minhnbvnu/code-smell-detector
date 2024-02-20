function resetTdWidth(table, editor) {
        var tds = domUtils.getElementsByTagName(table,'td th');
        utils.each(tds, function (td) {
            td.removeAttribute("width");
        });
        table.setAttribute('width', getTableWidth(editor, true, getDefaultValue(editor, table)));
        var tdsWidths = [];
        setTimeout(function () {
            utils.each(tds, function (td) {
                (td.colSpan == 1) && tdsWidths.push(td.offsetWidth)
            })
            utils.each(tds, function (td,i) {
                (td.colSpan == 1) && td.setAttribute("width", tdsWidths[i] + "");
            })
        }, 0);
    }