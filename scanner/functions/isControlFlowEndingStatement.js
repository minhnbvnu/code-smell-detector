function isControlFlowEndingStatement(kind, parent2) {
                        switch (kind) {
                            case 250 /* ReturnStatement */:
                            case 254 /* ThrowStatement */:
                            case 248 /* ContinueStatement */:
                            case 249 /* BreakStatement */:
                                return parent2.kind !== 238 /* Block */;
                            default:
                                return false;
                        }
                    }