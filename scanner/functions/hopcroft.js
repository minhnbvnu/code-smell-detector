function hopcroft(symbols, idMap, revEdges) {
        var i, j, k, keys, key, key1, key2, top, group1, group2, symbol, revGroup,
            ids = Object.keys(idMap).sort(),
            partitions = {},
            front = 0,
            queue = [],
            visited = {};
        group1 = [];
        group2 = [];
        for (i = 0; i < ids.length; i += 1) {
            if (idMap[ids[i]].type === 'accept') {
                group1.push(ids[i]);
            } else {
                group2.push(ids[i]);
            }
        }
        key = group1.join(',');
        partitions[key] = group1;
        queue.push(key);
        visited[key] = 0;
        if (group2.length !== 0) {
            key = group2.join(',');
            partitions[key] = group2;
            queue.push(key);
        }
        while (front < queue.length) {
            top = queue[front];
            front += 1;
            if (top) {
                top = top.split(',');
                for (i = 0; i < symbols.length; i += 1) {
                    symbol = symbols[i];
                    revGroup = {};
                    for (j = 0; j < top.length; j += 1) {
                        if (revEdges.hasOwnProperty(top[j]) && revEdges[top[j]].hasOwnProperty(symbol)) {
                            for (k = 0; k < revEdges[top[j]][symbol].length; k += 1) {
                                revGroup[revEdges[top[j]][symbol][k]] = true;
                            }
                        }
                    }
                    keys = Object.keys(partitions);
                    for (j = 0; j < keys.length; j += 1) {
                        key = keys[j];
                        group1 = [];
                        group2 = [];
                        for (k = 0; k < partitions[key].length; k += 1) {
                            if (revGroup.hasOwnProperty(partitions[key][k])) {
                                group1.push(partitions[key][k]);
                            } else {
                                group2.push(partitions[key][k]);
                            }
                        }
                        if (group1.length !== 0 && group2.length !== 0) {
                            delete partitions[key];
                            key1 = group1.join(',');
                            key2 = group2.join(',');
                            partitions[key1] = group1;
                            partitions[key2] = group2;
                            if (visited.hasOwnProperty(key1)) {
                                queue[visited[key1]] = null;
                                visited[key1] = queue.length;
                                queue.push(key1);
                                visited[key2] = queue.length;
                                queue.push(key2);
                            } else if (group1.length <= group2.length) {
                                visited[key1] = queue.length;
                                queue.push(key1);
                            } else {
                                visited[key2] = queue.length;
                                queue.push(key2);
                            }
                        }
                    }
                }
            }
        }
        return Object.values(partitions);
    }