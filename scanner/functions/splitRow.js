function splitRow(s, delimiter) {
    var row = [], c, col = '', i, inString = false;
    s = s.trim();
    for (i = 0; i < s.length; i += 1) {
        c = s[i];
        if (c === '"') {
            if (s[i+1] === '"') {
                col += '"';
                i += 1;
            } else {
                inString = !inString;
            }
        } else if (c === delimiter) {
            if (!inString) {
                row.push(col);
                col = '';
            } else {
                col += c;
            }
        } else {
            col += c;
        }
    }
    row.push(col);
    return row;
}