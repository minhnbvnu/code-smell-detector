function checkImportDeclaration(node) {
                if (checkGrammarModuleElementContext(node, isInJSFile(node) ? Diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module : Diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module)) {
                    return;
                }
                if (!checkGrammarModifiers(node) && hasEffectiveModifiers(node)) {
                    grammarErrorOnFirstToken(node, Diagnostics.An_import_declaration_cannot_have_modifiers);
                }
                if (checkExternalImportOrExportDeclaration(node)) {
                    const importClause = node.importClause;
                    if (importClause && !checkGrammarImportClause(importClause)) {
                        if (importClause.name) {
                            checkImportBinding(importClause);
                        }
                        if (importClause.namedBindings) {
                            if (importClause.namedBindings.kind === 271 /* NamespaceImport */) {
                                checkImportBinding(importClause.namedBindings);
                                if (moduleKind !== 4 /* System */ && (moduleKind < 5 /* ES2015 */ || getSourceFileOfNode(node).impliedNodeFormat === 1 /* CommonJS */) && getESModuleInterop(compilerOptions)) {
                                    checkExternalEmitHelpers(node, 65536 /* ImportStar */);
                                }
                            }
                            else {
                                const moduleExisted = resolveExternalModuleName(node, node.moduleSpecifier);
                                if (moduleExisted) {
                                    forEach(importClause.namedBindings.elements, checkImportBinding);
                                }
                            }
                        }
                    }
                }
                checkAssertClause(node);
            }