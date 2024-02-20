function isExternalDeclarationMerging(scope, variable, shadowed) {
                var _a;
                const [firstDefinition] = shadowed.defs;
                const [secondDefinition] = variable.defs;
                return (isTypeImport(firstDefinition) &&
                    isImportDeclaration(firstDefinition.parent) &&
                    isExternalModuleDeclarationWithName(scope, firstDefinition.parent.source.value) &&
                    secondDefinition.node.type === utils_1.AST_NODE_TYPES.TSInterfaceDeclaration &&
                    ((_a = secondDefinition.node.parent) === null || _a === void 0 ? void 0 : _a.type) ===
                        utils_1.AST_NODE_TYPES.ExportNamedDeclaration);
            }