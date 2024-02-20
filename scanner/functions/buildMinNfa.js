function buildMinNfa(start, partitions, idMap, revEdges) {
        var i, j, temp, node, symbol,
            nodes = [],
            group = {},
            edges = {};
        partitions.sort(function (a, b) {
            var ka = a.join(','), kb = b.join(',');
            if (ka < kb) {
                return -1;
            }
            if (ka > kb) {
                return 1;
            }
            return 0;
        });
        for (i = 0; i < partitions.length; i += 1) {
            if (partitions[i].indexOf(start.id) >= 0) {
                if (i > 0) {
                    temp = partitions[i];
                    partitions[i] = partitions[0];
                    partitions[0] = temp;
                }
                break;
            }
        }
        for (i = 0; i < partitions.length; i += 1) {
            node = {
                id: (i + 1).toString(),
                key: partitions[i].join(','),
                items: [],
                symbols: [],
                type: idMap[partitions[i][0]].type,
                edges: [],
                trans: {},
            };
            for (j = 0; j < partitions[i].length; j += 1) {
                node.items.push(idMap[partitions[i][j]]);
                group[partitions[i][j]] = i;
            }
            edges[i] = {};
            nodes.push(node);
        }
        Object.keys(revEdges).forEach(function (to) {
            Object.keys(revEdges[to]).forEach(function (symbol) {
                revEdges[to][symbol].forEach(function (from) {
                    if (!edges[group[from]].hasOwnProperty(group[to])) {
                        edges[group[from]][group[to]] = {};
                    }
                    edges[group[from]][group[to]][symbol] = true;
                });
            });
        });
        Object.keys(edges).forEach(function (from) {
            Object.keys(edges[from]).forEach(function (to) {
                symbol = Object.keys(edges[from][to]).sort().join(',');
                nodes[from].symbols.push(symbol);
                nodes[from].edges.push([symbol, nodes[to]]);
                nodes[from].trans[symbol] = nodes[to];
            });
        });
        return nodes[0];
    }