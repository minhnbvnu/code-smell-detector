function removeEmpties(grammar) {
        var i, j,
            hasEmpty = true,
            keys = Object.keys(grammar);
        while (hasEmpty) {
            hasEmpty = false;
            for (i = 1; i < keys.length; i += 1) {
                for (j = 0; j < grammar[keys[i]].length; j += 1) {
                    if (grammar[keys[i]][j].length === 1 && grammar[keys[i]][j][0] === 'ϵ') {
                        grammar[keys[i]].splice(j, 1);
                        j -= 1;
                        grammar = removeEmpty(grammar, keys, keys[i]);
                        hasEmpty = true;
                    }
                }
            }
        }
        return grammar;
    }