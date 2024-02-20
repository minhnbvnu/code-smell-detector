function checkStrictModeWithStatement(node) {
                if (inStrictMode) {
                    errorOnFirstToken(node, Diagnostics.with_statements_are_not_allowed_in_strict_mode);
                }
            }