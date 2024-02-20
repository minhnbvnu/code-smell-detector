function checkExternalModuleExports(node) {
                const moduleSymbol = getSymbolOfDeclaration(node);
                const links = getSymbolLinks(moduleSymbol);
                if (!links.exportsChecked) {
                    const exportEqualsSymbol = moduleSymbol.exports.get("export=");
                    if (exportEqualsSymbol && hasExportedMembers(moduleSymbol)) {
                        const declaration = getDeclarationOfAliasSymbol(exportEqualsSymbol) || exportEqualsSymbol.valueDeclaration;
                        if (declaration && !isTopLevelInExternalModuleAugmentation(declaration) && !isInJSFile(declaration)) {
                            error(declaration, Diagnostics.An_export_assignment_cannot_be_used_in_a_module_with_other_exported_elements);
                        }
                    }
                    const exports = getExportsOfModule(moduleSymbol);
                    if (exports) {
                        exports.forEach(({ declarations, flags }, id) => {
                            if (id === "__export") {
                                return;
                            }
                            if (flags & (1920 /* Namespace */ | 384 /* Enum */)) {
                                return;
                            }
                            const exportedDeclarationsCount = countWhere(declarations, and(isNotOverloadAndNotAccessor, not(isInterfaceDeclaration)));
                            if (flags & 524288 /* TypeAlias */ && exportedDeclarationsCount <= 2) {
                                return;
                            }
                            if (exportedDeclarationsCount > 1) {
                                if (!isDuplicatedCommonJSExport(declarations)) {
                                    for (const declaration of declarations) {
                                        if (isNotOverload(declaration)) {
                                            diagnostics.add(createDiagnosticForNode(declaration, Diagnostics.Cannot_redeclare_exported_variable_0, unescapeLeadingUnderscores(id)));
                                        }
                                    }
                                }
                            }
                        });
                    }
                    links.exportsChecked = true;
                }
            }