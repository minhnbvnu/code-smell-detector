function generateKernelKey(items) {
    'use strict';
    var i, j,
        key = '';
    items.sort();
    for (i = 0; i < items.length; i += 1) {
        if (i > 0) {
            key += ' | ';
        }
        key += items[i].head + ' ->';
        for (j = 0; j < items[i].body.length; j += 1) {
            key += ' ' + items[i].body[j];
        }
    }
    return key;
}