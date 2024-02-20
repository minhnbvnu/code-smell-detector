function checkExportDeclaration(node) {
                if (checkGrammarModuleElementContext(node, isInJSFile(node) ? Diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module : Diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module)) {
                    return;
                }
                if (!checkGrammarModifiers(node) && hasSyntacticModifiers(node)) {
                    grammarErrorOnFirstToken(node, Diagnostics.An_export_declaration_cannot_have_modifiers);
                }
                if (node.moduleSpecifier && node.exportClause && isNamedExports(node.exportClause) && length(node.exportClause.elements) && languageVersion === 0 /* ES3 */) {
                    checkExternalEmitHelpers(node, 4194304 /* CreateBinding */);
                }
                checkGrammarExportDeclaration(node);
                if (!node.moduleSpecifier || checkExternalImportOrExportDeclaration(node)) {
                    if (node.exportClause && !isNamespaceExport(node.exportClause)) {
                        forEach(node.exportClause.elements, checkExportSpecifier);
                        const inAmbientExternalModule = node.parent.kind === 265 /* ModuleBlock */ && isAmbientModule(node.parent.parent);
                        const inAmbientNamespaceDeclaration = !inAmbientExternalModule && node.parent.kind === 265 /* ModuleBlock */ && !node.moduleSpecifier && node.flags & 16777216 /* Ambient */;
                        if (node.parent.kind !== 308 /* SourceFile */ && !inAmbientExternalModule && !inAmbientNamespaceDeclaration) {
                            error(node, Diagnostics.Export_declarations_are_not_permitted_in_a_namespace);
                        }
                    }
                    else {
                        const moduleSymbol = resolveExternalModuleName(node, node.moduleSpecifier);
                        if (moduleSymbol && hasExportAssignmentSymbol(moduleSymbol)) {
                            error(node.moduleSpecifier, Diagnostics.Module_0_uses_export_and_cannot_be_used_with_export_Asterisk, symbolToString(moduleSymbol));
                        }
                        else if (node.exportClause) {
                            checkAliasSymbol(node.exportClause);
                        }
                        if (moduleKind !== 4 /* System */ && (moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */)) {
                            if (node.exportClause) {
                                if (getESModuleInterop(compilerOptions)) {
                                    checkExternalEmitHelpers(node, 65536 /* ImportStar */);
                                }
                            }
                            else {
                                checkExternalEmitHelpers(node, 32768 /* ExportStar */);
                            }
                        }
                    }
                }
                checkAssertClause(node);
            }