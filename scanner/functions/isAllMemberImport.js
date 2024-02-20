function isAllMemberImport(node) {
                return node.specifiers.every(specifier => specifier.type === utils_1.AST_NODE_TYPES.ImportSpecifier);
            }