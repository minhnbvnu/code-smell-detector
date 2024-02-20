function isExternalModuleDeclarationWithName(scope, name) {
                return (scope.type === scope_manager_1.ScopeType.tsModule &&
                    scope.block.type === utils_1.AST_NODE_TYPES.TSModuleDeclaration &&
                    scope.block.id.type === utils_1.AST_NODE_TYPES.Literal &&
                    scope.block.id.value === name);
            }