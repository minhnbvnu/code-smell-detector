function isReusableVariableDeclaration(node) {
                        if (node.kind !== 257 /* VariableDeclaration */) {
                            return false;
                        }
                        const variableDeclarator = node;
                        return variableDeclarator.initializer === void 0;
                    }