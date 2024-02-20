function appendExportsOfDeclaration(statements, decl, excludeName) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                const name = factory2.getDeclarationName(decl);
                const exportSpecifiers = moduleInfo.exportSpecifiers.get(idText(name));
                if (exportSpecifiers) {
                    for (const exportSpecifier of exportSpecifiers) {
                        if (exportSpecifier.name.escapedText !== excludeName) {
                            statements = appendExportStatement(statements, exportSpecifier.name, name);
                        }
                    }
                }
                return statements;
            }