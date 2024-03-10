function preAssignFuncDeclScopes(ast, context) {
        var funcDecl = ast;
        var container = null;
        var localContainer = null;
        if(funcDecl.type) {
            localContainer = ast.type.symbol;
        }
        var isStatic = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Static);
        var isInnerStatic = isStatic && context.scopeChain.fnc != null;
        var parentScope = isInnerStatic ? context.scopeChain.fnc.type.memberScope : context.scopeChain.scope;
        if(context.scopeChain.thisType && (!funcDecl.isConstructor || TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod))) {
            var instType = context.scopeChain.thisType;
            if(!(instType.typeFlags & TypeScript.TypeFlags.IsClass) && !TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
                if(!funcDecl.isMethod() || isStatic) {
                    parentScope = instType.constructorScope;
                } else {
                    parentScope = instType.containedScope;
                }
            } else {
                if(context.scopeChain.previous.scope.container && context.scopeChain.previous.scope.container.declAST && context.scopeChain.previous.scope.container.declAST.nodeType == TypeScript.NodeType.FuncDecl && (context.scopeChain.previous.scope.container.declAST).isConstructor) {
                    parentScope = instType.constructorScope;
                } else {
                    if(isStatic && context.scopeChain.classType) {
                        parentScope = context.scopeChain.classType.containedScope;
                    } else {
                        parentScope = instType.containedScope;
                    }
                }
            }
            container = instType.symbol;
        } else {
            if(funcDecl.isConstructor && context.scopeChain.thisType) {
                container = context.scopeChain.thisType.symbol;
            }
        }
        if(funcDecl.type == null || TypeScript.hasFlag(funcDecl.type.symbol.flags, TypeScript.SymbolFlags.TypeSetDuringScopeAssignment)) {
            if(context.scopeChain.fnc && context.scopeChain.fnc.type) {
                container = context.scopeChain.fnc.type.symbol;
            }
            var funcScope = null;
            var outerFnc = context.scopeChain.fnc;
            var nameText = funcDecl.name ? funcDecl.name.actualText : null;
            var fgSym = null;
            if(isStatic) {
                if(outerFnc.type.members == null && container.getType().memberScope) {
                    outerFnc.type.members = ((container).type.memberScope).valueMembers;
                }
                funcScope = context.scopeChain.fnc.type.memberScope;
                outerFnc.innerStaticFuncs[outerFnc.innerStaticFuncs.length] = funcDecl;
            } else {
                funcScope = context.scopeChain.scope;
            }
            if(nameText && nameText != "__missing" && !funcDecl.isAccessor()) {
                if(isStatic) {
                    fgSym = funcScope.findLocal(nameText, false, false);
                } else {
                    fgSym = funcScope.findLocal(nameText, false, false);
                }
            }
            context.typeFlow.checker.createFunctionSignature(funcDecl, container, funcScope, fgSym, fgSym == null);
            if(!funcDecl.accessorSymbol && (funcDecl.fncFlags & TypeScript.FncFlags.ClassMethod) && container && ((!fgSym || fgSym.declAST.nodeType != TypeScript.NodeType.FuncDecl) && funcDecl.isAccessor()) || (fgSym && fgSym.isAccessor())) {
                funcDecl.accessorSymbol = context.typeFlow.checker.createAccessorSymbol(funcDecl, fgSym, container.getType(), (funcDecl.isMethod() && isStatic), true, funcScope, container);
            }
            funcDecl.type.symbol.flags |= TypeScript.SymbolFlags.TypeSetDuringScopeAssignment;
        }
        if(funcDecl.name && funcDecl.type) {
            funcDecl.name.sym = funcDecl.type.symbol;
        }
        funcDecl.scopeType = funcDecl.type;
        if(funcDecl.isOverload) {
            return;
        }
        var funcTable = new TypeScript.StringHashTable();
        var funcMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(funcTable, new TypeScript.StringHashTable()));
        var ambientFuncTable = new TypeScript.StringHashTable();
        var ambientFuncMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(ambientFuncTable, new TypeScript.StringHashTable()));
        var funcStaticTable = new TypeScript.StringHashTable();
        var funcStaticMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(funcStaticTable, new TypeScript.StringHashTable()));
        var ambientFuncStaticTable = new TypeScript.StringHashTable();
        var ambientFuncStaticMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(ambientFuncStaticTable, new TypeScript.StringHashTable()));
        funcDecl.unitIndex = context.typeFlow.checker.locationInfo.unitIndex;
        var locals = new TypeScript.SymbolScopeBuilder(funcMembers, ambientFuncMembers, null, null, parentScope, localContainer);
        var statics = new TypeScript.SymbolScopeBuilder(funcStaticMembers, ambientFuncStaticMembers, null, null, parentScope, null);
        if(funcDecl.isConstructor && context.scopeChain.thisType) {
            context.scopeChain.thisType.constructorScope = locals;
        }
        funcDecl.symbols = funcTable;
        if(!funcDecl.isSpecialFn()) {
            var group = funcDecl.type;
            var signature = funcDecl.signature;
            if(!funcDecl.isConstructor) {
                group.containedScope = locals;
                locals.container = group.symbol;
                group.memberScope = statics;
                statics.container = group.symbol;
            }
            funcDecl.enclosingFnc = context.scopeChain.fnc;
            group.enclosingType = isStatic ? context.scopeChain.classType : context.scopeChain.thisType;
            var fgSym = ast.type.symbol;
            if(((funcDecl.fncFlags & TypeScript.FncFlags.Signature) == TypeScript.FncFlags.None) && funcDecl.vars) {
                context.typeFlow.addLocalsFromScope(locals, fgSym, funcDecl.vars, funcTable, false);
                context.typeFlow.addLocalsFromScope(statics, fgSym, funcDecl.statics, funcStaticTable, false);
            }
            if(signature.parameters) {
                var len = signature.parameters.length;
                for(var i = 0; i < len; i++) {
                    var paramSym = signature.parameters[i];
                    context.typeFlow.checker.resolveTypeLink(locals, paramSym.parameter.typeLink, true);
                }
            }
            context.typeFlow.checker.resolveTypeLink(locals, signature.returnType, funcDecl.isSignature());
        }
        if(!funcDecl.isConstructor || TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
            var thisType = (funcDecl.isConstructor && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) ? context.scopeChain.thisType : null;
            pushAssignScope(locals, context, thisType, null, funcDecl);
        }
        if(funcDecl.name && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.IsFunctionExpression)) {
            if(funcDecl.name.sym) {
                funcTable.add(funcDecl.name.actualText, funcDecl.name.sym);
            }
        }
    }