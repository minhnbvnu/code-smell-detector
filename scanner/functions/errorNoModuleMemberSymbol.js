function errorNoModuleMemberSymbol(moduleSymbol, targetSymbol, node, name) {
                var _a2;
                const moduleName = getFullyQualifiedName(moduleSymbol, node);
                const declarationName = declarationNameToString(name);
                const suggestion = getSuggestedSymbolForNonexistentModule(name, targetSymbol);
                if (suggestion !== void 0) {
                    const suggestionName = symbolToString(suggestion);
                    const diagnostic = error(name, Diagnostics._0_has_no_exported_member_named_1_Did_you_mean_2, moduleName, declarationName, suggestionName);
                    if (suggestion.valueDeclaration) {
                        addRelatedInfo(diagnostic, createDiagnosticForNode(suggestion.valueDeclaration, Diagnostics._0_is_declared_here, suggestionName));
                    }
                }
                else {
                    if ((_a2 = moduleSymbol.exports) == null ? void 0 : _a2.has("default" /* Default */)) {
                        error(name, Diagnostics.Module_0_has_no_exported_member_1_Did_you_mean_to_use_import_1_from_0_instead, moduleName, declarationName);
                    }
                    else {
                        reportNonExportedMember(node, name, declarationName, moduleSymbol, moduleName);
                    }
                }
            }