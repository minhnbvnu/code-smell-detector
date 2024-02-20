function pathCommandToString(cmd) {
    var str = '<strong>' + cmd.type + '</strong> ' +
        ((cmd.x !== undefined) ? 'x=' + cmd.x + ' y=' + cmd.y + ' ' : '') +
        ((cmd.x1 !== undefined) ? 'x1=' + cmd.x1 + ' y1=' + cmd.y1 + ' ' : '') +
        ((cmd.x2 !== undefined) ? 'x2=' + cmd.x2 + ' y2=' + cmd.y2 : '');
    return str;
}