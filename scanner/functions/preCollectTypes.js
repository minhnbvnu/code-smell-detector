function preCollectTypes(ast, parent, walker) {
        var context = walker.state;
        var go = false;
        var scopeChain = context.scopeChain;
        if(ast.nodeType == TypeScript.NodeType.Script) {
            var script = ast;
            context.script = script;
            go = true;
        } else {
            if(ast.nodeType == TypeScript.NodeType.List) {
                go = true;
            } else {
                if(ast.nodeType == TypeScript.NodeType.ImportDeclaration) {
                    go = preCollectImportTypes(ast, parent, context);
                } else {
                    if(ast.nodeType == TypeScript.NodeType.With) {
                        go = false;
                    } else {
                        if(ast.nodeType == TypeScript.NodeType.ModuleDeclaration) {
                            go = preCollectModuleTypes(ast, parent, context);
                        } else {
                            if(ast.nodeType == TypeScript.NodeType.ClassDeclaration) {
                                go = preCollectClassTypes(ast, parent, context);
                            } else {
                                if(ast.nodeType == TypeScript.NodeType.Block) {
                                    go = true;
                                } else {
                                    if(ast.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                                        go = preCollectInterfaceTypes(ast, parent, context);
                                    } else {
                                        if(ast.nodeType == TypeScript.NodeType.ArgDecl) {
                                            go = preCollectArgDeclTypes(ast, parent, context);
                                        } else {
                                            if(ast.nodeType == TypeScript.NodeType.VarDecl) {
                                                go = preCollectVarDeclTypes(ast, parent, context);
                                            } else {
                                                if(ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                                    go = preCollectFuncDeclTypes(ast, parent, context);
                                                } else {
                                                    if(ast.isStatementOrExpression() && context.scopeChain.moduleDecl) {
                                                        context.scopeChain.moduleDecl.recordNonInterface();
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        walker.options.goChildren = go;
        return ast;
    }