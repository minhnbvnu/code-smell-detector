function asyncBodyVisitor(node) {
                if (isNodeWithPossibleHoistedDeclaration(node)) {
                    switch (node.kind) {
                        case 240 /* VariableStatement */:
                            return visitVariableStatementInAsyncBody(node);
                        case 245 /* ForStatement */:
                            return visitForStatementInAsyncBody(node);
                        case 246 /* ForInStatement */:
                            return visitForInStatementInAsyncBody(node);
                        case 247 /* ForOfStatement */:
                            return visitForOfStatementInAsyncBody(node);
                        case 295 /* CatchClause */:
                            return visitCatchClauseInAsyncBody(node);
                        case 238 /* Block */:
                        case 252 /* SwitchStatement */:
                        case 266 /* CaseBlock */:
                        case 292 /* CaseClause */:
                        case 293 /* DefaultClause */:
                        case 255 /* TryStatement */:
                        case 243 /* DoStatement */:
                        case 244 /* WhileStatement */:
                        case 242 /* IfStatement */:
                        case 251 /* WithStatement */:
                        case 253 /* LabeledStatement */:
                            return visitEachChild(node, asyncBodyVisitor, context);
                        default:
                            return Debug.assertNever(node, "Unhandled node.");
                    }
                }
                return visitor(node);
            }