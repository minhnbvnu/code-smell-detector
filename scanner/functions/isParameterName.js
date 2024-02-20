function isParameterName(node) {
                        return node.kind === 79 /* Identifier */ && node.parent.kind === 166 /* Parameter */ && node.parent.name === node;
                    }