function isTypeImport(definition) {
                return ((definition === null || definition === void 0 ? void 0 : definition.type) === scope_manager_1.DefinitionType.ImportBinding &&
                    (definition.parent.importKind === 'type' ||
                        (definition.node.type === utils_1.AST_NODE_TYPES.ImportSpecifier &&
                            definition.node.importKind === 'type')));
            }