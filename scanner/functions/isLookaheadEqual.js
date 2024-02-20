function isLookaheadEqual(a, b) {
    'use strict';
    var i, j;
    if (a.length !== b.length) {
        return false;
    }
    for (i = 0; i < a.length; i += 1) {
        if (a[i].lookahead.length !== b[i].lookahead.length) {
            return false;
        }
        a[i].lookahead.sort();
        b[i].lookahead.sort();
        for (j = 0; j < a[i].lookahead.length; j += 1) {
            if (a[i].lookahead[j] !== b[i].lookahead[j]) {
                return false;
            }
        }
    }
    return true;
}