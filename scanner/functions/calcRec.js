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