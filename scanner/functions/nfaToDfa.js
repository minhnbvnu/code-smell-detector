function nfaToDfa(nfa) {
    'use strict';
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
    function toAlphaCount(n) {
        var a = 'A'.charCodeAt(0),
            z = 'Z'.charCodeAt(0),
            len = z - a + 1,
            s = '';
        while (n >= 0) {
            s = String.fromCharCode(n % len + a) + s;
            n = Math.floor(n / len) - 1;
        }
        return s;
    }
    var i,
        first = getClosure([nfa]),
        states = {},
        front = 0,
        top,
        closure,
        queue = [first],
        count = 0;
    first.id = toAlphaCount(count);
    states[first.key] = first;
    while (front < queue.length) {
        top = queue[front];
        front += 1;
        for (i = 0; i < top.symbols.length; i += 1) {
            closure = getClosedMove(top, top.symbols[i]);
            if (!states.hasOwnProperty(closure.key)) {
                count += 1;
                closure.id = toAlphaCount(count);
                states[closure.key] = closure;
                queue.push(closure);
            }
            top.trans[top.symbols[i]] = states[closure.key];
            top.edges.push([top.symbols[i], states[closure.key]]);
        }
    }
    return first;
}