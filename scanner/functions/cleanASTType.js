function cleanASTType(ast, parent) {
                ast.type = null;
                if(ast.nodeType == TypeScript.NodeType.VarDecl) {
                    var vardecl = ast;
                    vardecl.sym = null;
                } else {
                    if(ast.nodeType == TypeScript.NodeType.ArgDecl) {
                        var argdecl = ast;
                        argdecl.sym = null;
                    } else {
                        if(ast.nodeType == TypeScript.NodeType.Name) {
                            var name = ast;
                            name.sym = null;
                        } else {
                            if(ast.nodeType == TypeScript.NodeType.FuncDecl) {
                                var funcdecl = ast;
                                funcdecl.signature = null;
                                funcdecl.freeVariables = new Array();
                                funcdecl.symbols = null;
                                funcdecl.accessorSymbol = null;
                                funcdecl.scopeType = null;
                            } else {
                                if(ast.nodeType == TypeScript.NodeType.ModuleDeclaration) {
                                    var modDecl = ast;
                                    modDecl.mod = null;
                                } else {
                                    if(ast.nodeType == TypeScript.NodeType.With) {
                                        (ast).withSym = null;
                                    } else {
                                        if(ast.nodeType == TypeScript.NodeType.Catch) {
                                            (ast).containedScope = null;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return ast;
            }