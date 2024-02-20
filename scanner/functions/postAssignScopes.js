function postAssignScopes(ast, parent, walker) {
        var context = walker.state;
        var go = true;
        if(ast) {
            if(ast.nodeType == TypeScript.NodeType.ModuleDeclaration) {
                var prevModDecl = ast;
                popAssignScope(context);
                context.modDeclChain.pop();
                if(context.modDeclChain.length >= 1) {
                    context.typeFlow.checker.currentModDecl = context.modDeclChain[context.modDeclChain.length - 1];
                }
            } else {
                if(ast.nodeType == TypeScript.NodeType.ClassDeclaration) {
                    popAssignScope(context);
                } else {
                    if(ast.nodeType == TypeScript.NodeType.InterfaceDeclaration) {
                        popAssignScope(context);
                    } else {
                        if(ast.nodeType == TypeScript.NodeType.With) {
                            popAssignScope(context);
                        } else {
                            if(ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                var funcDecl = ast;
                                if((!funcDecl.isConstructor || TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) && !funcDecl.isOverload) {
                                    popAssignScope(context);
                                }
                            } else {
                                if(ast.nodeType == TypeScript.NodeType.Catch) {
                                    var catchBlock = ast;
                                    if(catchBlock.param) {
                                        popAssignScope(context);
                                    }
                                } else {
                                    go = false;
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