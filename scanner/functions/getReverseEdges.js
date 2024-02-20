function getReverseEdges(start) {
        var i, top, symbol, next,
            front = 0,
            queue = [start],
            visited = {},
            symbols = {},   // The input alphabet
            idMap = {},     // Map id to states
            revEdges = {};  // Map id to the ids which connects to the id with an alphabet
        visited[start.id] = true;
        while (front < queue.length) {
            top = queue[front];
            front += 1;
            idMap[top.id] = top;
            for (i = 0; i < top.symbols.length; i += 1) {
                symbol = top.symbols[i];
                if (!symbols.hasOwnProperty(symbol)) {
                    symbols[symbol] = true;
                }
                next = top.trans[symbol];
                if (!revEdges.hasOwnProperty(next.id)) {
                    revEdges[next.id] = {};
                }
                if (!revEdges[next.id].hasOwnProperty(symbol)) {
                    revEdges[next.id][symbol] = [];
                }
                revEdges[next.id][symbol].push(top.id);
                if (!visited.hasOwnProperty(next.id)) {
                    visited[next.id] = true;
                    queue.push(next);
                }
            }
        }
        return [Object.keys(symbols), idMap, revEdges];
    }