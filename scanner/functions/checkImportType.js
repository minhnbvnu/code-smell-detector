function checkImportType(node) {
                checkSourceElement(node.argument);
                if (node.assertions) {
                    const override = getResolutionModeOverrideForClause(node.assertions.assertClause, grammarErrorOnNode);
                    if (override) {
                        if (!isNightly()) {
                            grammarErrorOnNode(node.assertions.assertClause, Diagnostics.resolution_mode_assertions_are_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next);
                        }
                        if (getEmitModuleResolutionKind(compilerOptions) !== 3 /* Node16 */ && getEmitModuleResolutionKind(compilerOptions) !== 99 /* NodeNext */) {
                            grammarErrorOnNode(node.assertions.assertClause, Diagnostics.resolution_mode_assertions_are_only_supported_when_moduleResolution_is_node16_or_nodenext);
                        }
                    }
                }
                checkTypeReferenceOrImport(node);
            }