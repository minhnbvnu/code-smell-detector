function getClosedMove(closure, symbol) {
        var i,
            j,
            node,
            nexts = [];
        for (i = 0; i < closure.items.length; i += 1) {
            node = closure.items[i];
            for (j = 0; j < node.edges.length; j += 1) {
                if (symbol === node.edges[j][0]) {
                    if (nexts.indexOf(node.edges[j][1]) < 0) {
                        nexts.push(node.edges[j][1]);
                    }
                }
            }
        }
        return getClosure(nexts);
    }