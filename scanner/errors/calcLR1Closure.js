function calcLR1Closure(grammar, items, preNullables, preFirsts) {
    'use strict';
    var i, j, k, l, m, hasNewItem, key, item, index, first, lookahead,
        nullables = preNullables || calcNullables(grammar),
        firsts = preFirsts || calcFirsts(grammar, nullables),
        closure = {};
    closure.kernel = [].concat(items);
    closure.nonkernel = [];
    while (true) {
        hasNewItem = false;
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
                            lookahead = [];
                            for (l = j + 2; l < items[i].body.length; l += 1) {
                                first = firsts[items[i].body[l]];
                                for (m = 0; m < first.length; m += 1) {
                                    if (first[m] !== 'ϵ' && lookahead.indexOf(first[m]) < 0) {
                                        lookahead.push(first[m]);
                                    }
                                }
                                if (!nullables[items[i].body[l]]) {
                                    break;
                                }
                            }
                            if (l === items[i].body.length) {
                                for (m = 0; m < items[i].lookahead.length; m += 1) {
                                    if (lookahead.indexOf(items[i].lookahead[m]) < 0) {
                                        lookahead.push(items[i].lookahead[m]);
                                    }
                                }
                            }
                            item.lookahead = lookahead;
                            index = indexOfItems(item, closure.nonkernel);
                            if (index < 0) {
                                closure.nonkernel.push(item);
                                items.push(item);
                                hasNewItem = true;
                            } else {
                                for (m = 0; m < item.lookahead.length; m += 1) {
                                    if (closure.nonkernel[index].lookahead.indexOf(item.lookahead[m]) < 0) {
                                        closure.nonkernel[index].lookahead.push(item.lookahead[m]);
                                        hasNewItem = true;
                                    }
                                }
                            }
                        }
                    }
                    break;
                }
            }
        }
        if (!hasNewItem) {
            break;
        }
    }
    for (i = 0; i < closure.nonkernel.length; i += 1) {
        closure.nonkernel[i].lookahead.sort();
    }
    return closure;
}