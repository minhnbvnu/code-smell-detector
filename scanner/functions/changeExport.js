function changeExport(exportingSourceFile, { wasDefault, exportNode, exportName }, changes, checker) {
            if (wasDefault) {
                if (isExportAssignment(exportNode) && !exportNode.isExportEquals) {
                    const exp = exportNode.expression;
                    const spec = makeExportSpecifier(exp.text, exp.text);
                    changes.replaceNode(exportingSourceFile, exportNode, factory.createExportDeclaration(
                    /*modifiers*/
                    void 0, 
                    /*isTypeOnly*/
                    false, factory.createNamedExports([spec])));
                }
                else {
                    changes.delete(exportingSourceFile, Debug.checkDefined(findModifier(exportNode, 88 /* DefaultKeyword */), "Should find a default keyword in modifier list"));
                }
            }
            else {
                const exportKeyword = Debug.checkDefined(findModifier(exportNode, 93 /* ExportKeyword */), "Should find an export keyword in modifier list");
                switch (exportNode.kind) {
                    case 259 /* FunctionDeclaration */:
                    case 260 /* ClassDeclaration */:
                    case 261 /* InterfaceDeclaration */:
                        changes.insertNodeAfter(exportingSourceFile, exportKeyword, factory.createToken(88 /* DefaultKeyword */));
                        break;
                    case 240 /* VariableStatement */:
                        const decl = first(exportNode.declarationList.declarations);
                        if (!ts_FindAllReferences_exports.Core.isSymbolReferencedInFile(exportName, checker, exportingSourceFile) && !decl.type) {
                            changes.replaceNode(exportingSourceFile, exportNode, factory.createExportDefault(Debug.checkDefined(decl.initializer, "Initializer was previously known to be present")));
                            break;
                        }
                    case 263 /* EnumDeclaration */:
                    case 262 /* TypeAliasDeclaration */:
                    case 264 /* ModuleDeclaration */:
                        changes.deleteModifier(exportingSourceFile, exportKeyword);
                        changes.insertNodeAfter(exportingSourceFile, exportNode, factory.createExportDefault(factory.createIdentifier(exportName.text)));
                        break;
                    default:
                        Debug.fail(`Unexpected exportNode kind ${exportNode.kind}`);
                }
            }
        }