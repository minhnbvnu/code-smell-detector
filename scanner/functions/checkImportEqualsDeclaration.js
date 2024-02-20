function checkImportEqualsDeclaration(node) {
                if (checkGrammarModuleElementContext(node, isInJSFile(node) ? Diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module : Diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_namespace_or_module)) {
                    return;
                }
                checkGrammarModifiers(node);
                if (isInternalModuleImportEqualsDeclaration(node) || checkExternalImportOrExportDeclaration(node)) {
                    checkImportBinding(node);
                    if (hasSyntacticModifier(node, 1 /* Export */)) {
                        markExportAsReferenced(node);
                    }
                    if (node.moduleReference.kind !== 280 /* ExternalModuleReference */) {
                        const target = resolveAlias(getSymbolOfDeclaration(node));
                        if (target !== unknownSymbol) {
                            const targetFlags = getAllSymbolFlags(target);
                            if (targetFlags & 111551 /* Value */) {
                                const moduleName = getFirstIdentifier(node.moduleReference);
                                if (!(resolveEntityName(moduleName, 111551 /* Value */ | 1920 /* Namespace */).flags & 1920 /* Namespace */)) {
                                    error(moduleName, Diagnostics.Module_0_is_hidden_by_a_local_declaration_with_the_same_name, declarationNameToString(moduleName));
                                }
                            }
                            if (targetFlags & 788968 /* Type */) {
                                checkTypeNameIsReserved(node.name, Diagnostics.Import_name_cannot_be_0);
                            }
                        }
                        if (node.isTypeOnly) {
                            grammarErrorOnNode(node, Diagnostics.An_import_alias_cannot_use_import_type);
                        }
                    }
                    else {
                        if (moduleKind >= 5 /* ES2015 */ && getSourceFileOfNode(node).impliedNodeFormat === void 0 && !node.isTypeOnly && !(node.flags & 16777216 /* Ambient */)) {
                            grammarErrorOnNode(node, Diagnostics.Import_assignment_cannot_be_used_when_targeting_ECMAScript_modules_Consider_using_import_Asterisk_as_ns_from_mod_import_a_from_mod_import_d_from_mod_or_another_module_format_instead);
                        }
                    }
                }
            }