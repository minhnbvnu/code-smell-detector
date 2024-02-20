function constructCYKParsingTable(grammar, code) {
        var i, j, k, l, li, ri,
            key = '',
            keys = Object.keys(grammar),
            inverse = {},
            table = [];
        // Record inverse grammar
        for (i = 0; i < keys.length; i += 1) {
            for (j = 0; j < grammar[keys[i]].length; j += 1) {
                key = grammar[keys[i]][j].join(' ');
                if (!inverse.hasOwnProperty(key)) {
                    inverse[key] = [];
                }
                inverse[key].push(keys[i]);
            }
        }
        // Initiliaze table and diagonal
        for (i = 0; i < code.length; i += 1) {
            table.push([]);
            for (j = 0; j < code.length; j += 1) {
                table[i].push([]);
            }
            if (inverse.hasOwnProperty(code[i])) {
                table[i][i] = table[i][i].concat(inverse[code[i]]);
            }
        }
        // Extend by dynamic programming
        for (l = 1; l < code.length; l += 1) {
            for (i = 0; i + l < code.length; i += 1) {
                j = i + l;
                for (k = i; k < j; k += 1) {
                    for (li = 0; li < table[i][k].length; li += 1) {
                        for (ri = 0; ri < table[k + 1][j].length; ri += 1) {
                            key = table[i][k][li] + ' ' + table[k + 1][j][ri];
                            if (inverse.hasOwnProperty(key)) {
                                table[i][j] = table[i][j].concat(inverse[key]);
                            }
                        }
                    }
                }
                table[i][j] = Array.from(new Set(table[i][j]));
            }
        }
        return table;
    }