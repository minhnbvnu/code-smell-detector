function getBreakOrContinueStatementOccurrences(breakOrContinueStatement) {
                        const owner = getBreakOrContinueOwner(breakOrContinueStatement);
                        if (owner) {
                            switch (owner.kind) {
                                case 245 /* ForStatement */:
                                case 246 /* ForInStatement */:
                                case 247 /* ForOfStatement */:
                                case 243 /* DoStatement */:
                                case 244 /* WhileStatement */:
                                    return getLoopBreakContinueOccurrences(owner);
                                case 252 /* SwitchStatement */:
                                    return getSwitchCaseDefaultOccurrences(owner);
                            }
                        }
                        return void 0;
                    }