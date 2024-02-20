function constructLALRAutomaton(grammar) {
    'use strict';
    var i, j, k,
        key,
        keys = Object.keys(grammar),
        nullables = calcNullables(grammar),
        firsts = calcFirsts(grammar, nullables),
        follows = calcFollows(grammar, nullables, firsts),
        automaton,
        queue,
        front = 0,
        closure,
        item,
        items,
        kernel,
        kernels = {},
        kernelCount = 0,
        start;
    if (keys.length === 0) {
        return null;
    }
    start = keys[0] + "'";
    while (grammar.hasOwnProperty(start)) {
        start += "'";
    }
    automaton = calcLR1Closure(grammar, [{
        head: start,
        body: ['.', keys[0]],
        lookahead: ['$']
    }], nullables, firsts);
    automaton.num = 0;
    automaton.key = generateKernelKey(automaton.kernel);
    automaton.edges = {};
    kernels[automaton.key] = automaton;
    queue = [automaton];
    while (front < queue.length) {
        closure = queue[front];
        front += 1;
        items = closure.kernel.concat(closure.nonkernel);
        keys = [];
        for (i = 0; i < items.length; i += 1) {
            for (j = 0; j < items[i].body.length; j += 1) {
                if (items[i].body[j] === '.') {
                    j += 1;
                    if (j < items[i].body.length && keys.indexOf(items[i].body[j]) < 0) {
                        keys.push(items[i].body[j]);
                    }
                    break;
                }
            }
            if (j === items[i].body.length && items[i].head === start) {
                closure.accept = true;
            }
        }
        for (i = 0; i < keys.length; i += 1) {
            kernel = [];
            for (j = 0; j < items.length; j += 1) {
                for (k = 0; k < items[j].body.length; k += 1) {
                    if (items[j].body[k] === '.') {
                        if (k + 1 < items[j].body.length && items[j].body[k + 1] === keys[i]) {
                            item = {
                                head: items[j].head,
                                body: items[j].body.slice(0, k)
                                    .concat([items[j].body[k + 1]])
                                    .concat([items[j].body[k]])
                                    .concat(items[j].body.slice(k + 2)),
                                lookahead: [].concat(items[j].lookahead)
                            };
                            kernel.push(item);
                        }
                        break;
                    }
                }
            }
            if (kernel.length > 0) {
                key = generateKernelKey(kernel);
                if (kernels.hasOwnProperty(key)) {
                    if (!isLookaheadEqual(kernel, kernels[key])) {
                        mergeLookahead(kernels[key].kernel, kernel);
                        kernel = kernels[key].kernel;
                        delete kernels[key].kernel;
                        delete kernels[key].nonkernel;
                        kernel = calcLR1Closure(grammar, kernel, nullables, firsts);
                        kernels[key].kernel = kernel.kernel;
                        kernels[key].nonkernel = kernel.nonkernel;
                    }
                } else {
                    kernel = calcLR1Closure(grammar, kernel, nullables, firsts);
                    kernelCount += 1;
                    kernel.num = kernelCount;
                    kernel.key = key;
                    kernel.edges = {};
                    kernels[key] = kernel;
                    queue.push(kernel);
                }
                closure.edges[keys[i]] = key;
            }
        }
    }
    keys = Object.keys(kernels);
    for (k = 0; k < keys.length; k += 1) {
        key = Object.keys(kernels[keys[k]].edges);
        for (j = 0; j < key.length; j += 1) {
            kernels[keys[k]].edges[key[j]] = kernels[kernels[keys[k]].edges[key[j]]];
        }
        closure = kernels[keys[k]];
        closure.reduces = {};
        for (i = 0; i < closure.kernel.length; i += 1) {
            if (closure.kernel[i].head !== start && closure.kernel[i].body[closure.kernel[i].body.length - 1] === '.') {
                for (j = 0; j < follows[closure.kernel[i].head].length; j += 1) {
                    if (closure.kernel[i].lookahead.indexOf(follows[closure.kernel[i].head][j]) >= 0) {
                        if (!closure.reduces.hasOwnProperty(follows[closure.kernel[i].head][j])) {
                            closure.reduces[follows[closure.kernel[i].head][j]] = [];
                        }
                        closure.reduces[follows[closure.kernel[i].head][j]].push({
                            head: closure.kernel[i].head,
                            body: closure.kernel[i].body.slice(0, closure.kernel[i].body.length - 1)
                        });
                    }
                }
            }
        }
    }
    return automaton;
}