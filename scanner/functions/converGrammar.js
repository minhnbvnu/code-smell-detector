function converGrammar(grammar) {
        var i, j, k, last,
            term,
            key,
            helperIndex = 0,
            singles = {},
            multis = {},
            keys = Object.keys(grammar);
        for (i = 0; i < keys.length; i += 1) {
            if (grammar[keys[i]].length === 1) {
                if (grammar[keys[i]][0].length === 1) {
                    term = grammar[keys[i]][0][0];
                    if (term !== 'ϵ' && !grammar.hasOwnProperty(term)) {
                        singles[term] = keys[i];
                    }
                }
            }
        }
        for (i = 0; i < keys.length; i += 1) {
            if (grammar[keys[i]].length === 1) {
                multis[grammar[keys[i]][0].join(' ')] = keys[i];
            }
        }
        for (i = 0; i < keys.length; i += 1) {
            for (j = 0; j < grammar[keys[i]].length; j += 1) {
                if (grammar[keys[i]][j].length === 2) {
                    for (k = 0; k < 2; k += 1) {
                        if (!grammar.hasOwnProperty(grammar[keys[i]][j][k])) {
                            if (!singles.hasOwnProperty(grammar[keys[i]][j][k])) {
                                helperIndex = getHelperIndex(grammar, helperIndex);
                                key = getHelperKey(helperIndex);
                                keys.push(key);
                                grammar[key] = [[grammar[keys[i]][j][k]]];
                                singles[grammar[keys[i]][j][k]] = key;
                            }
                            grammar[keys[i]][j][k] = singles[grammar[keys[i]][j][k]];
                        }
                    }
                } else if (grammar[keys[i]][j].length > 2) {
                    last = grammar[keys[i]][j].length - 1;
                    if (!grammar.hasOwnProperty(grammar[keys[i]][j][last])) {
                        if (!singles.hasOwnProperty(grammar[keys[i]][j][last])) {
                            helperIndex = getHelperIndex(grammar, helperIndex);
                            key = getHelperKey(helperIndex);
                            keys.push(key);
                            grammar[key] = [[grammar[keys[i]][j][last]]];
                            singles[grammar[keys[i]][j][last]] = key;
                        }
                        grammar[keys[i]][j][last] = singles[grammar[keys[i]][j][last]];
                    }
                    term = grammar[keys[i]][j].slice(0, last).join(' ');
                    if (!multis.hasOwnProperty(term)) {
                        helperIndex = getHelperIndex(grammar, helperIndex);
                        key = getHelperKey(helperIndex);
                        keys.push(key);
                        grammar[key] = [grammar[keys[i]][j].slice(0, last)];
                        multis[term] = key;
                    }
                    grammar[keys[i]][j] = [multis[term], grammar[keys[i]][j][last]];
                }
            }
        }
        return grammar;
    }