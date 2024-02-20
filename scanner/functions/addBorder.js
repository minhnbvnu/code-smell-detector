function addBorder(col, ts, style) {
        if (col.border) {
            if (/[.']-+[.']/.test(ts)) {
                return '';
            }
            if (ts.trim().length !== 0) {
                return style;
            }
            return '  ';
        }
        return '';
    }