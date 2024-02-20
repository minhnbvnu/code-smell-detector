function getAMDImportExpressionForImport(node) {
                if (isImportEqualsDeclaration(node) || isExportDeclaration(node) || !getExternalModuleNameLiteral(factory2, node, currentSourceFile, host, resolver, compilerOptions)) {
                    return void 0;
                }
                const name = getLocalNameForExternalImport(factory2, node, currentSourceFile);
                const expr = getHelperExpressionForImport(node, name);
                if (expr === name) {
                    return void 0;
                }
                return factory2.createExpressionStatement(factory2.createAssignment(name, expr));
            }