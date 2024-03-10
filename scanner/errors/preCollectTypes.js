                                                if(ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                                    go = preCollectFuncDeclTypes(ast, parent, context);
                                                } else {
                                                    if(ast.isStatementOrExpression() && context.scopeChain.moduleDecl) {
                                                        context.scopeChain.moduleDecl.recordNonInterface();
                                                    }
                                                }