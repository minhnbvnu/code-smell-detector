function isSameItem(a, b) {
    'use strict';
    var i;
    if (a.head !== b.head || a.body.length !== b.body.length) {
        return false;
    }
    for (i = 0; i < a.body.length; i += 1) {
        if (a.body[i] !== b.body[i]) {
            return false;
        }
    }
    return true;
}