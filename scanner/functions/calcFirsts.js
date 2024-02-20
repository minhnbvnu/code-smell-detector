function calcFirsts(grammar, preNullables) {
    'use strict';
    var i, j, k,
        nullables = preNullables || calcNullables(grammar),
        firsts = {},
        finished = false,
        keys = Object.keys(grammar);
    for (i = 0; i < keys.length; i += 1) {
        for (j = 0; j < grammar[keys[i]].length; j += 1) {
            for (k = 0; k < grammar[keys[i]][j].length; k += 1) {
                if (!grammar.hasOwnProperty(grammar[keys[i]][j][k])) {
                    firsts[grammar[keys[i]][j][k]] = [grammar[keys[i]][j][k]];
                }
            }
        }
    }
    function calcRec(key, path) {
        var ii, jj, kk, first;
        if (!grammar.hasOwnProperty(key)) {
            return firsts[key];
        }
        if (path.indexOf(key) >= 0) {
            return firsts[key];
        }
        path = path.concat([key]);
        if (!firsts.hasOwnProperty(key)) {
            firsts[key] = [];
            finished = false;
        }
        for (ii = 0; ii < grammar[key].length; ii += 1) {
            for (jj = 0; jj < grammar[key][ii].length; jj += 1) {
                first = calcRec(grammar[key][ii][jj], path);
                for (kk = 0; kk < first.length; kk += 1) {
                    if (firsts[key].indexOf(first[kk]) < 0 && first[kk] !== 'ϵ') {
                        firsts[key].push(first[kk]);
                        finished = false;
                    }
                }
                if (!nullables[grammar[key][ii][jj]]) {
                    break;
                }
            }
            if (jj === grammar[key][ii].length) {
                if (firsts[key].indexOf('ϵ') < 0) {
                    firsts[key].push('ϵ');
                }
            }
        }
        return firsts[key];
    }
    while (!finished) {
        finished = true;
        for (i = 0; i < keys.length; i += 1) {
            calcRec(keys[i], []);
        }
    }
    Object.keys(firsts).forEach(function (key) {
        firsts[key].sort();
    });
    return firsts;
}