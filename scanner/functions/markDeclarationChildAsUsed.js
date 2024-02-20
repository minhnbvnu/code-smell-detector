function markDeclarationChildAsUsed(node) {
                var _a;
                const identifiers = [];
                switch (node.type) {
                    case utils_1.AST_NODE_TYPES.TSInterfaceDeclaration:
                    case utils_1.AST_NODE_TYPES.TSTypeAliasDeclaration:
                    case utils_1.AST_NODE_TYPES.ClassDeclaration:
                    case utils_1.AST_NODE_TYPES.FunctionDeclaration:
                    case utils_1.AST_NODE_TYPES.TSDeclareFunction:
                    case utils_1.AST_NODE_TYPES.TSEnumDeclaration:
                    case utils_1.AST_NODE_TYPES.TSModuleDeclaration:
                        if (((_a = node.id) === null || _a === void 0 ? void 0 : _a.type) === utils_1.AST_NODE_TYPES.Identifier) {
                            identifiers.push(node.id);
                        }
                        break;
                    case utils_1.AST_NODE_TYPES.VariableDeclaration:
                        for (const declaration of node.declarations) {
                            visitPattern(declaration, pattern => {
                                identifiers.push(pattern);
                            });
                        }
                        break;
                }
                let scope = context.getScope();
                const shouldUseUpperScope = [
                    utils_1.AST_NODE_TYPES.TSModuleDeclaration,
                    utils_1.AST_NODE_TYPES.TSDeclareFunction,
                ].includes(node.type);
                if (scope.variableScope !== scope) {
                    scope = scope.variableScope;
                }
                else if (shouldUseUpperScope && scope.upper) {
                    scope = scope.upper;
                }
                for (const id of identifiers) {
                    const superVar = scope.set.get(id.name);
                    if (superVar) {
                        superVar.eslintUsed = true;
                    }
                }
            }