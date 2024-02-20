function calc(key) {
        var ii, jj, kk, ll, mid, first;
        for (ii = 0; ii < grammar[key].length; ii += 1) {
            for (jj = 0; jj < grammar[key][ii].length; jj += 1) {
                // A -> aBb
                mid = grammar[key][ii][jj];
                if (grammar.hasOwnProperty(mid)) {
                    for (kk = jj + 1; kk < grammar[key][ii].length; kk += 1) {
                        first = firsts[grammar[key][ii][kk]];
                        for (ll = 0; ll < first.length; ll += 1) {
                            if (first[ll] !== 'ϵ' && follows[mid].indexOf(first[ll]) < 0) {
                                follows[mid].push(first[ll]);
                                finished = false;
                            }
                        }
                        if (!nullables[grammar[key][ii][kk]]) {
                            break;
                        }
                    }
                    if (kk === grammar[key][ii].length) {
                        for (ll = 0; ll < follows[key].length; ll += 1) {
                            if (follows[mid].indexOf(follows[key][ll]) < 0) {
                                follows[mid].push(follows[key][ll]);
                                finished = false;
                            }
                        }
                    }
                }
            }
        }
    }