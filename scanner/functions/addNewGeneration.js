function addNewGeneration(grammar, key, newGeneration) {
        var idx;
        for (idx = 0; idx < grammar[key].length; idx += 1) {
            if (arrayEqual(newGeneration, grammar[key][idx])) {
                return;
            }
        }
        grammar[key].push(newGeneration);
    }