function getModuleDeclarations(variable) {
            const nodes = new Set();
            variable.defs.forEach(def => {
                if (def.node.type === utils_1.AST_NODE_TYPES.TSModuleDeclaration) {
                    nodes.add(def.node);
                }
            });
            return nodes;
        }