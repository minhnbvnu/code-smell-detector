function mergeLookahead(a, b) {
    'use strict';
    var i, j;
    for (i = 0; i < a.length; i += 1) {
        for (j = 0; j < b[i].lookahead.length; j += 1) {
            if (a[i].lookahead.indexOf(b[i].lookahead[j]) < 0) {
                a[i].lookahead.push(b[i].lookahead[j]);
            }
        }
        a[i].lookahead.sort();
    }
}