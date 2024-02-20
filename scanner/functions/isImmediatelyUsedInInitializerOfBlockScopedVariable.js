function isImmediatelyUsedInInitializerOfBlockScopedVariable(declaration2, usage2) {
                    switch (declaration2.parent.parent.kind) {
                        case 240 /* VariableStatement */:
                        case 245 /* ForStatement */:
                        case 247 /* ForOfStatement */:
                            if (isSameScopeDescendentOf(usage2, declaration2, declContainer)) {
                                return true;
                            }
                            break;
                    }
                    const grandparent = declaration2.parent.parent;
                    return isForInOrOfStatement(grandparent) && isSameScopeDescendentOf(usage2, grandparent.expression, declContainer);
                }