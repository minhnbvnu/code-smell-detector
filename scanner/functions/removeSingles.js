function removeSingles(grammar) {
        var i, j, k,
            key,
            hasSingle = true,
            keys = Object.keys(grammar);
        while (hasSingle) {
            hasSingle = false;
            for (i = 0; i < keys.length; i += 1) {
                for (j = 0; j < grammar[keys[i]].length; j += 1) {
                    if (grammar[keys[i]][j].length === 1 && grammar.hasOwnProperty(grammar[keys[i]][j][0])) {
                        key = grammar[keys[i]][j][0];
                        grammar[keys[i]].splice(j, 1);
                        for (k = 0; k < grammar[key].length; k += 1) {
                            addNewGeneration(grammar, keys[i], grammar[key][k]);
                        }
                        hasSingle = true;
                    }
                }
            }
        }
        return grammar;
    }