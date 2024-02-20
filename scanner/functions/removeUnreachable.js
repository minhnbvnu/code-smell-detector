function removeUnreachable(grammar) {
        var i, j, front = 0, term,
            keys = Object.keys(grammar),
            queue = [keys[0]],
            reachable = {};
        reachable[keys[0]] = true;
        while (front < queue.length) {
            for (i = 0; i < grammar[queue[front]].length; i += 1) {
                for (j = 0; j < grammar[queue[front]][i].length; j += 1) {
                    term = grammar[queue[front]][i][j];
                    if (grammar.hasOwnProperty(term) && !reachable.hasOwnProperty(term)) {
                        queue.push(term);
                        reachable[term] = true;
                    }
                }
            }
            front += 1;
        }
        for (i = 0; i < keys.length; i += 1) {
            if (!reachable.hasOwnProperty(keys[i])) {
                delete grammar[keys[i]];
            }
        }
        return grammar;
    }