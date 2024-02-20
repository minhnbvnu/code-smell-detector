function showDragLineAt(state, cell) {
        if (!cell) return;
        var table = domUtils.findParentByTagName(cell, "table"),
            caption = table.getElementsByTagName('caption'),
            width = table.offsetWidth,
            height = table.offsetHeight - (caption.length > 0 ? caption[0].offsetHeight : 0),
            tablePos = domUtils.getXY(table),
            cellPos = domUtils.getXY(cell), css;
        switch (state) {
            case "h":
                css = 'height:' + height + 'px;top:' + (tablePos.y + (caption.length > 0 ? caption[0].offsetHeight : 0)) + 'px;left:' + (cellPos.x + cell.offsetWidth);
                dragLine.style.cssText = css + 'px;position: absolute;display:block;background-color:blue;width:1px;border:0; color:blue;opacity:.3;filter:alpha(opacity=30)';
                break;
            case "v":
                css = 'width:' + width + 'px;left:' + tablePos.x + 'px;top:' + (cellPos.y + cell.offsetHeight );
                //必须加上border:0和color:blue，否则低版ie不支持背景色显示
                dragLine.style.cssText = css + 'px;overflow:hidden;position: absolute;display:block;background-color:blue;height:1px;border:0;color:blue;opacity:.2;filter:alpha(opacity=20)';
                break;
            default:
        }
    }