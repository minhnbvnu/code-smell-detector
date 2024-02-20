function checkAssertClause(declaration) {
                var _a2;
                if (declaration.assertClause) {
                    const validForTypeAssertions = isExclusivelyTypeOnlyImportOrExport(declaration);
                    const override = getResolutionModeOverrideForClause(declaration.assertClause, validForTypeAssertions ? grammarErrorOnNode : void 0);
                    if (validForTypeAssertions && override) {
                        if (!isNightly()) {
                            grammarErrorOnNode(declaration.assertClause, Diagnostics.resolution_mode_assertions_are_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next);
                        }
                        if (getEmitModuleResolutionKind(compilerOptions) !== 3 /* Node16 */ && getEmitModuleResolutionKind(compilerOptions) !== 99 /* NodeNext */) {
                            return grammarErrorOnNode(declaration.assertClause, Diagnostics.resolution_mode_assertions_are_only_supported_when_moduleResolution_is_node16_or_nodenext);
                        }
                        return;
                    }
                    const mode = moduleKind === 199 /* NodeNext */ && declaration.moduleSpecifier && getUsageModeForExpression(declaration.moduleSpecifier);
                    if (mode !== 99 /* ESNext */ && moduleKind !== 99 /* ESNext */) {
                        return grammarErrorOnNode(declaration.assertClause, moduleKind === 199 /* NodeNext */ ? Diagnostics.Import_assertions_are_not_allowed_on_statements_that_transpile_to_commonjs_require_calls : Diagnostics.Import_assertions_are_only_supported_when_the_module_option_is_set_to_esnext_or_nodenext);
                    }
                    if (isImportDeclaration(declaration) ? (_a2 = declaration.importClause) == null ? void 0 : _a2.isTypeOnly : declaration.isTypeOnly) {
                        return grammarErrorOnNode(declaration.assertClause, Diagnostics.Import_assertions_cannot_be_used_with_type_only_imports_or_exports);
                    }
                    if (override) {
                        return grammarErrorOnNode(declaration.assertClause, Diagnostics.resolution_mode_can_only_be_set_for_type_only_imports);
                    }
                }
            }