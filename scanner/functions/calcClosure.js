function calcClosure(grammar, items) {
    'use strict';
    var i, j, k, key, item,
        closure = {};
    closure.kernel = [].concat(items);
    closure.nonkernel = [];
    for (i = 0; i < items.length; i += 1) {
        for (j = 0; j < items[i].body.length; j += 1) {
            if (items[i].body[j] === '.' && j + 1 < items[i].body.length) {
                key = items[i].body[j + 1];
                if (grammar.hasOwnProperty(key)) {
                    for (k = 0; k < grammar[key].length; k += 1) {
                        item = {
                            head: key,
                            body: ['.'].concat(grammar[key][k])
                        };
                        if (grammar[key][k].length === 1 && grammar[key][k][0] === 'ϵ') {
                            item.body = ['.'];
                        }
                        if (!isInItems(item, closure.nonkernel)) {
                            closure.nonkernel.push(item);
                            items.push(item);
                        }
                    }
                }
                break;
            }
        }
    }
    return closure;
}