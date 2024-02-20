function getBreakOrContinueOwner(statement) {
                        return findAncestor(statement, (node) => {
                            switch (node.kind) {
                                case 252 /* SwitchStatement */:
                                    if (statement.kind === 248 /* ContinueStatement */) {
                                        return false;
                                    }
                                case 245 /* ForStatement */:
                                case 246 /* ForInStatement */:
                                case 247 /* ForOfStatement */:
                                case 244 /* WhileStatement */:
                                case 243 /* DoStatement */:
                                    return !statement.label || isLabeledBy(node, statement.label.escapedText);
                                default:
                                    return isFunctionLike(node) && "quit";
                            }
                        });
                    }