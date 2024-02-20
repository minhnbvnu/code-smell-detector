function preAssignScopes(ast, parent, walker) {
        var context = walker.state;
        var go = true;
        if(ast) {
            if(ast.nodeType == TypeScript.NodeType.List) {
                var list = ast;
                list.enclosingScope = context.scopeChain.scope;
            } else {
                if(ast.nodeType == TypeScript.NodeType.ModuleDeclaration) {
                    preAssignModuleScopes(ast, context);
                } else {
                    if(ast.nodeType == TypeScript.NodeType.ClassDeclaration) {
                        preAssignClassScopes(ast, context);
                    } else {
                        if(ast.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                            preAssignInterfaceScopes(ast, context);
                        } else {
                            if(ast.nodeType == TypeScript.NodeType.With) {
                                preAssignWithScopes(ast, context);
                            } else {
                                if(ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                    preAssignFuncDeclScopes(ast, context);
                                } else {
                                    if(ast.nodeType == TypeScript.NodeType.Catch) {
                                        preAssignCatchScopes(ast, context);
                                    } else {
                                        if(ast.nodeType == TypeScript.NodeType.TypeRef) {
                                            go = false;
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