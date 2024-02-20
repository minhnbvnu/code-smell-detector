function expectUndefined(nodes, msg) {
                    for (const node of nodes) {
                        const sNode = store.getSync(node.prefix, false);
                        if (node.equals(sNode)) {
                            throw Error(`${node.prefix} should be undefined. ${msg}`);
                        }
                    }
                }