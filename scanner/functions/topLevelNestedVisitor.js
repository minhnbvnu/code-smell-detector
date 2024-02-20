function topLevelNestedVisitor(node) {
                switch (node.kind) {
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 260 /* ClassDeclaration */:
                        return visitClassDeclaration(node);
                    case 245 /* ForStatement */:
                        return visitForStatement(node, 
                        /*isTopLevel*/
                        true);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node);
                    case 243 /* DoStatement */:
                        return visitDoStatement(node);
                    case 244 /* WhileStatement */:
                        return visitWhileStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    case 251 /* WithStatement */:
                        return visitWithStatement(node);
                    case 252 /* SwitchStatement */:
                        return visitSwitchStatement(node);
                    case 266 /* CaseBlock */:
                        return visitCaseBlock(node);
                    case 292 /* CaseClause */:
                        return visitCaseClause(node);
                    case 293 /* DefaultClause */:
                        return visitDefaultClause(node);
                    case 255 /* TryStatement */:
                        return visitTryStatement(node);
                    case 295 /* CatchClause */:
                        return visitCatchClause(node);
                    case 238 /* Block */:
                        return visitBlock(node);
                    case 358 /* MergeDeclarationMarker */:
                        return visitMergeDeclarationMarker(node);
                    case 359 /* EndOfDeclarationMarker */:
                        return visitEndOfDeclarationMarker(node);
                    default:
                        return visitor(node);
                }
            }