function _paintSymbolHandleLines(painter, symbol, rect) {
    let lines = symbol.split('\n');

    for (let i = 1; i < lines.length; i++) {
        painter.print(
            lines[i],
            rect.x + rect.w/2,
            rect.y + rect.h/2 + 9*i,
            'center',
            'hanging',
            'black',
            GATE_SYMBOL_FONT,
            rect.w,
            16);
    }

    return {symbol: lines[0], offsetY: lines.length > 1 ? -5 : 0};
}