function getClosure(nodes) {
        var i,
            closure = [],
            stack = [],
            symbols = [],
            type = '',
            top;
        for (i = 0; i < nodes.length; i += 1) {
            stack.push(nodes[i]);
            closure.push(nodes[i]);
            if (nodes[i].type === 'accept') {
                type = 'accept';
            }
        }
        while (stack.length > 0) {
            top = stack.pop();
            for (i = 0; i < top.edges.length; i += 1) {
                if (top.edges[i][0] === 'ϵ') {
                    if (closure.indexOf(top.edges[i][1]) < 0) {
                        stack.push(top.edges[i][1]);
                        closure.push(top.edges[i][1]);
                        if (top.edges[i][1].type === 'accept') {
                            type = 'accept';
                        }
                    }
                } else {
                    if (symbols.indexOf(top.edges[i][0]) < 0) {
                        symbols.push(top.edges[i][0]);
                    }
                }
            }
        }
        closure.sort(function (a, b) {
            return a.id - b.id;
        });
        symbols.sort();
        return {
            'key': closure.map(function (x) {
                return x.id;
            }).join(','),
            'items': closure,
            'symbols': symbols,
            'type': type,
            'edges': [],
            'trans': {}
        };
    }