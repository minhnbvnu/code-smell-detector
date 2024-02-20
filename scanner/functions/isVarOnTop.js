function isVarOnTop(node, statements) {
                const l = statements.length;
                let i = 0;
                // Skip over directives and imports. Static blocks don't have either.
                if (node.parent.type !== "StaticBlock") {
                    for (; i < l; ++i) {
                        if (!looksLikeDirective(statements[i]) && !looksLikeImport(statements[i])) {
                            break;
                        }
                    }
                }
                for (; i < l; ++i) {
                    if (!isVariableDeclaration(statements[i])) {
                        return false;
                    }
                    if (statements[i] === node) {
                        return true;
                    }
                }
                return false;
            }