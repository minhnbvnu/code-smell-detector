function isSingleVariableDeclaration(node) {
                return ((node === null || node === void 0 ? void 0 : node.type) === utils_1.AST_NODE_TYPES.VariableDeclaration &&
                    node.kind !== 'const' &&
                    node.declarations.length === 1);
            }