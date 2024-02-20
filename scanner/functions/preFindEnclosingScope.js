function preFindEnclosingScope(ast, parent, walker) {
        var context = walker.state;
        var minChar = ast.minChar;
        var limChar = ast.limChar;
        if(ast.nodeType == TypeScript.NodeType.Script && context.pos > limChar) {
            limChar = context.pos;
        }
        if((minChar <= context.pos) && (limChar >= context.pos)) {
            switch(ast.nodeType) {
                case TypeScript.NodeType.Script: {
                    var script = ast;
                    context.scopeGetter = function () {
                        return script.bod === null ? null : script.bod.enclosingScope;
                    };
                    context.scopeStartAST = script;
                    break;

                }
                case TypeScript.NodeType.ClassDeclaration: {
                    context.scopeGetter = function () {
                        return (ast.type === null || ast.type.instanceType.containedScope === null) ? null : ast.type.instanceType.containedScope;
                    };
                    context.scopeStartAST = ast;
                    context.enclosingClassDecl = ast;
                    break;

                }
                case TypeScript.NodeType.ObjectLit: {
                    var objectLit = ast;
                    if(objectLit.targetType) {
                        context.scopeGetter = function () {
                            return objectLit.targetType.containedScope;
                        };
                        context.objectLiteralScopeGetter = function () {
                            return objectLit.targetType.memberScope;
                        };
                        context.enclosingObjectLit = objectLit;
                    }
                    break;

                }
                case TypeScript.NodeType.ModuleDeclaration: {
                    context.deepestModuleDecl = ast;
                    context.scopeGetter = function () {
                        return ast.type === null ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;

                }
                case TypeScript.NodeType.InterfaceDeclaration: {
                    context.scopeGetter = function () {
                        return (ast.type === null) ? null : ast.type.containedScope;
                    };
                    context.scopeStartAST = ast;
                    break;

                }
                case TypeScript.NodeType.FuncDecl: {
 {
                        var funcDecl = ast;
                        if(context.skipNextFuncDeclForClass) {
                            context.skipNextFuncDeclForClass = false;
                        } else {
                            context.scopeGetter = function () {
                                if(funcDecl.isConstructor && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
                                    if(ast.type && ast.type.enclosingType) {
                                        return ast.type.enclosingType.constructorScope;
                                    }
                                }
                                if(funcDecl.scopeType) {
                                    return funcDecl.scopeType.containedScope;
                                }
                                if(funcDecl.type) {
                                    return funcDecl.type.containedScope;
                                }
                                return null;
                            };
                            context.scopeStartAST = ast;
                        }
                    }
                    break;

                }
            }
            walker.options.goChildren = true;
        } else {
            walker.options.goChildren = false;
        }
        return ast;
    }