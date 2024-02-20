function appendExportsOfHoistedDeclaration(statements, decl) {
                if (moduleInfo.exportEquals) {
                    return statements;
                }
                let excludeName;
                if (hasSyntacticModifier(decl, 1 /* Export */)) {
                    const exportName = hasSyntacticModifier(decl, 1024 /* Default */) ? factory2.createStringLiteral("default") : decl.name;
                    statements = appendExportStatement(statements, exportName, factory2.getLocalName(decl));
                    excludeName = getTextOfIdentifierOrLiteral(exportName);
                }
                if (decl.name) {
                    statements = appendExportsOfDeclaration(statements, decl, excludeName);
                }
                return statements;
            }