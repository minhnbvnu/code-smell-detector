function classifySpecifier(node) {
                var _a;
                const defaultSpecifier = node.specifiers[0].type === utils_1.AST_NODE_TYPES.ImportDefaultSpecifier
                    ? node.specifiers[0]
                    : null;
                const namespaceSpecifier = (_a = node.specifiers.find((specifier) => specifier.type === utils_1.AST_NODE_TYPES.ImportNamespaceSpecifier)) !== null && _a !== void 0 ? _a : null;
                const namedSpecifiers = node.specifiers.filter((specifier) => specifier.type === utils_1.AST_NODE_TYPES.ImportSpecifier);
                return {
                    defaultSpecifier,
                    namespaceSpecifier,
                    namedSpecifiers,
                };
            }