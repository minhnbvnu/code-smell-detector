function calcNullables(grammar) {
    'use strict';
    var i, j, k,
        nullables = {},
        keys = Object.keys(grammar);
    for (i = 0; i < keys.length; i += 1) {
        for (j = 0; j < grammar[keys[i]].length; j += 1) {
            for (k = 0; k < grammar[keys[i]][j].length; k += 1) {
                if (!grammar.hasOwnProperty(grammar[keys[i]][j][k])) {
                    nullables[grammar[keys[i]][j][k]] = false;
                }
            }
        }
    }
    if (nullables.hasOwnProperty('ϵ')) {
        nullables['ϵ'] = true;
    }
    function calcRec(key, path) {
        var ii, jj;
        if (path.indexOf(key) >= 0) {
            return false;
        }
        path = path.concat([key]);
        if (nullables.hasOwnProperty(key)) {
            return nullables[key];
        }
        for (ii = 0; ii < grammar[key].length; ii += 1) {
            for (jj = 0; jj < grammar[key][ii].length; jj += 1) {
                if (!calcRec(grammar[key][ii][jj], path)) {
                    break;
                }
            }
            if (jj === grammar[key][ii].length) {
                nullables[key] = true;
                return true;
            }
        }
        nullables[key] = false;
        return false;
    }
    keys.forEach(function (key) {
        calcRec(key, []);
    });
    return nullables;
}