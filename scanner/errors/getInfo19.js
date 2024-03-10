function getInfo19(context, considerPartialSpans = true) {
            const { file, program } = context;
            const span = getRefactorContextSpan(context);
            const token = getTokenAtPosition(file, span.start);
            const exportNode = !!(token.parent && getSyntacticModifierFlags(token.parent) & 1 /* Export */) && considerPartialSpans ? token.parent : getParentNodeInSpan(token, file, span);
            if (!exportNode || !isSourceFile(exportNode.parent) && !(isModuleBlock(exportNode.parent) && isAmbientModule(exportNode.parent.parent))) {
                return { error: getLocaleSpecificMessage(Diagnostics.Could_not_find_export_statement) };
            }
            const checker = program.getTypeChecker();
            const exportingModuleSymbol = getExportingModuleSymbol(exportNode.parent, checker);
            const flags = getSyntacticModifierFlags(exportNode) || (isExportAssignment(exportNode) && !exportNode.isExportEquals ? 1025 /* ExportDefault */ : 0 /* None */);
            const wasDefault = !!(flags & 1024 /* Default */);
            if (!(flags & 1 /* Export */) || !wasDefault && exportingModuleSymbol.exports.has("default" /* Default */)) {
                return { error: getLocaleSpecificMessage(Diagnostics.This_file_already_has_a_default_export) };
            }
            const noSymbolError = (id) => isIdentifier(id) && checker.getSymbolAtLocation(id) ? void 0 : { error: getLocaleSpecificMessage(Diagnostics.Can_only_convert_named_export) };
            switch (exportNode.kind) {
                case 259 /* FunctionDeclaration */:
                case 260 /* ClassDeclaration */:
                case 261 /* InterfaceDeclaration */:
                case 263 /* EnumDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                case 264 /* ModuleDeclaration */: {
                    const node = exportNode;
                    if (!node.name)
                        return void 0;
                    return noSymbolError(node.name) || { exportNode: node, exportName: node.name, wasDefault, exportingModuleSymbol };
                }
                case 240 /* VariableStatement */: {
                    const vs = exportNode;
                    if (!(vs.declarationList.flags & 2 /* Const */) || vs.declarationList.declarations.length !== 1) {
                        return void 0;
                    }
                    const decl = first(vs.declarationList.declarations);
                    if (!decl.initializer)
                        return void 0;
                    Debug.assert(!wasDefault, "Can't have a default flag here");
                    return noSymbolError(decl.name) || { exportNode: vs, exportName: decl.name, wasDefault, exportingModuleSymbol };
                }
                case 274 /* ExportAssignment */: {
                    const node = exportNode;
                    if (node.isExportEquals)
                        return void 0;
                    return noSymbolError(node.expression) || { exportNode: node, exportName: node.expression, wasDefault, exportingModuleSymbol };
                }
                default:
                    return void 0;
            }
        }