function expectDefined(nodes, msg) {
                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes[i];
                        const sNode = store.getSync(node.prefix, false);
                        if (!node.equals(sNode)) {
                            throw Error(`${node.prefix} should be defined. ${msg}`);
                        }
                    }
                }