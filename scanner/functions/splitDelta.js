function splitDelta(c, pos) {
    var lines = c.lines;
    var end = c.end;
    c.end = clonePos(pos);    
    var rowsBefore = c.end.row - c.start.row;
    var otherLines = lines.splice(rowsBefore, lines.length);
    
    var col = rowsBefore ? pos.column : pos.column - c.start.column;
    lines.push(otherLines[0].substring(0, col));
    otherLines[0] = otherLines[0].substr(col)   ; 
    var rest = {
        start: clonePos(pos),
        end: end,
        lines: otherLines,
        action: c.action
    };
    return rest;
}