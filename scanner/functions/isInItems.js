function isInItems(item, items) {
    'use strict';
    var i;
    for (i = 0; i < items.length; i += 1) {
        if (isSameItem(item, items[i])) {
            return true;
        }
    }
    return false;
}