function getTargetofModuleDefault(moduleSymbol, node, dontResolveAlias) {
                var _a2;
                let exportDefaultSymbol;
                if (isShorthandAmbientModuleSymbol(moduleSymbol)) {
                    exportDefaultSymbol = moduleSymbol;
                }
                else {
                    exportDefaultSymbol = resolveExportByName(moduleSymbol, "default" /* Default */, node, dontResolveAlias);
                }
                const file = (_a2 = moduleSymbol.declarations) == null ? void 0 : _a2.find(isSourceFile);
                const specifier = getModuleSpecifierForImportOrExport(node);
                if (!specifier) {
                    return exportDefaultSymbol;
                }
                const hasDefaultOnly = isOnlyImportedAsDefault(specifier);
                const hasSyntheticDefault = canHaveSyntheticDefault(file, moduleSymbol, dontResolveAlias, specifier);
                if (!exportDefaultSymbol && !hasSyntheticDefault && !hasDefaultOnly) {
                    if (hasExportAssignmentSymbol(moduleSymbol) && !allowSyntheticDefaultImports) {
                        const compilerOptionName = moduleKind >= 5 /* ES2015 */ ? "allowSyntheticDefaultImports" : "esModuleInterop";
                        const exportEqualsSymbol = moduleSymbol.exports.get("export=" /* ExportEquals */);
                        const exportAssignment = exportEqualsSymbol.valueDeclaration;
                        const err = error(node.name, Diagnostics.Module_0_can_only_be_default_imported_using_the_1_flag, symbolToString(moduleSymbol), compilerOptionName);
                        if (exportAssignment) {
                            addRelatedInfo(err, createDiagnosticForNode(exportAssignment, Diagnostics.This_module_is_declared_with_export_and_can_only_be_used_with_a_default_import_when_using_the_0_flag, compilerOptionName));
                        }
                    }
                    else if (isImportClause(node)) {
                        reportNonDefaultExport(moduleSymbol, node);
                    }
                    else {
                        errorNoModuleMemberSymbol(moduleSymbol, moduleSymbol, node, isImportOrExportSpecifier(node) && node.propertyName || node.name);
                    }
                }
                else if (hasSyntheticDefault || hasDefaultOnly) {
                    const resolved = resolveExternalModuleSymbol(moduleSymbol, dontResolveAlias) || resolveSymbol(moduleSymbol, dontResolveAlias);
                    markSymbolOfAliasDeclarationIfTypeOnly(node, moduleSymbol, resolved, 
                    /*overwriteTypeOnly*/
                    false);
                    return resolved;
                }
                markSymbolOfAliasDeclarationIfTypeOnly(node, exportDefaultSymbol, 
                /*finalTarget*/
                void 0, 
                /*overwriteTypeOnly*/
                false);
                return exportDefaultSymbol;
            }