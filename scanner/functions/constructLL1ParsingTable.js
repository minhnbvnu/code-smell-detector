function constructLL1ParsingTable(grammar) {
    'use strict';
    var i, j, k, l, first, follow,
        table = {},
        keys = Object.keys(grammar),
        nullables = calcNullables(grammar),
        firsts = calcFirsts(grammar, nullables),
        follows = calcFollows(grammar, nullables, firsts);
    for (i = 0; i < keys.length; i += 1) {
        table[keys[i]] = {};
        for (j = 0; j < grammar[keys[i]].length; j += 1) {
            for (k = 0; k < grammar[keys[i]][j].length; k += 1) {
                first = firsts[grammar[keys[i]][j][k]];
                for (l = 0; l < first.length; l += 1) {
                    if (first[l] !== 'ϵ') {
                        if (!table[keys[i]].hasOwnProperty(first[l])) {
                            table[keys[i]][first[l]] = [];
                        }
                        table[keys[i]][first[l]].push(grammar[keys[i]][j]);
                    }
                }
                if (!nullables[grammar[keys[i]][j][k]]) {
                    break;
                }
            }
            if (k === grammar[keys[i]][j].length) {
                follow = follows[keys[i]];
                for (l = 0; l < follow.length; l += 1) {
                    if (!table[keys[i]].hasOwnProperty(follow[l])) {
                        table[keys[i]][follow[l]] = [];
                    }
                    table[keys[i]][follow[l]].push(grammar[keys[i]][j]);
                }
            }
        }
    }
    return table;
}