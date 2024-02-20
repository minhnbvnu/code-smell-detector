function getResolutionModeOverrideForClauseInNightly(assertClause) {
                const mode = getResolutionModeOverrideForClause(assertClause);
                if (mode !== void 0) {
                    if (!isNightly()) {
                        context.addDiagnostic(createDiagnosticForNode(assertClause, Diagnostics.resolution_mode_assertions_are_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
                    }
                    return assertClause;
                }
                return void 0;
            }