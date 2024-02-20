function moveBySubWords(editor, direction, extend) {
    var selection = editor.selection;
    var row = selection.lead.row;
    var column = selection.lead.column;

    var line = editor.session.getLine(row);
    if (!line[column + direction]) {
        var method = (extend ? "selectWord" : "moveCursorShortWord")
            + (direction == 1 ? "Right" : "Left");
        return editor.selection[method]();
    }
    if (direction == -1) column--;
    while (line[column]) {
        var type = getType(line[column]) + getType(line[column + direction]);
        column += direction;
        if (direction == 1) {
            if (type == "WW" && getType(line[column + 1]) == "w")
                break;
        }
        else {
            if (type == "wW") {
                if (getType(line[column - 1]) == "W") {
                    column -= 1;
                    break;
                } else {
                    continue;
                }
            }
            if (type == "Ww")
                break;
        }
        if (/w[s_oW]|_[sWo]|o[s_wW]|s[W]|W[so]/.test(type))
            break;
    }
    if (direction == -1) column++;
    if (extend)
        editor.selection.moveCursorTo(row, column);
    else
        editor.selection.moveTo(row, column);
    
    function getType(x) {
        if (!x) return "-";
        if (/\s/.test(x)) return "s";
        if (x == "_") return "_";
        if (x.toUpperCase() == x && x.toLowerCase() != x) return "W";
        if (x.toUpperCase() != x && x.toLowerCase() == x) return "w";
        return "o";
    }
}