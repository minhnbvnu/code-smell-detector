function checkStrictModeLabeledStatement(node) {
                if (inStrictMode && getEmitScriptTarget(options) >= 2 /* ES2015 */) {
                    if (isDeclarationStatement(node.statement) || isVariableStatement(node.statement)) {
                        errorOnFirstToken(node.label, Diagnostics.A_label_is_not_allowed_here);
                    }
                }
            }