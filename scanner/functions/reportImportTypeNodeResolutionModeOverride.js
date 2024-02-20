function reportImportTypeNodeResolutionModeOverride() {
                if (!isNightly() && (errorNameNode || errorFallbackNode)) {
                    context.addDiagnostic(createDiagnosticForNode(errorNameNode || errorFallbackNode, Diagnostics.The_type_of_this_expression_cannot_be_named_without_a_resolution_mode_assertion_which_is_an_unstable_feature_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
                }
            }