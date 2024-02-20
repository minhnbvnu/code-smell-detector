function preCollectFuncDeclTypes(ast, parent, context) {
        var scopeChain = context.scopeChain;
        if(context.scopeChain.moduleDecl) {
            context.scopeChain.moduleDecl.recordNonInterface();
        }
        var funcDecl = ast;
        var fgSym = null;
        var nameText = funcDecl.getNameText();
        var isExported = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Exported | TypeScript.FncFlags.ClassPropertyMethodExported);
        var isStatic = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Static);
        var isPrivate = TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Private);
        var isConstructor = funcDecl.isConstructMember() || funcDecl.isConstructor;
        var containerSym = (((funcDecl.isMethod() && isStatic) || funcDecl.isAccessor()) && context.scopeChain.classType ? context.scopeChain.classType.symbol : context.scopeChain.container);
        var containerScope = context.scopeChain.scope;
        var isGlobal = containerSym == context.checker.gloMod;
        var isOptional = funcDecl.name && TypeScript.hasFlag(funcDecl.name.flags, TypeScript.ASTFlags.OptionalName);
        var go = false;
        var foundSymbol = false;
        if(isConstructor && TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.ClassMethod)) {
            containerSym = containerSym.container;
            containerScope = scopeChain.previous.scope;
        }
        funcDecl.unitIndex = context.checker.locationInfo.unitIndex;
        if(!funcDecl.isConstructor && containerSym && containerSym.declAST && containerSym.declAST.nodeType == TypeScript.NodeType.FuncDecl && (containerSym.declAST).isConstructor && !funcDecl.isMethod()) {
            return go;
        }
        if(TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Signature)) {
            var instType = context.scopeChain.thisType;
            if(nameText && nameText != "__missing") {
                if(isStatic) {
                    fgSym = containerSym.type.members.allMembers.lookup(nameText);
                } else {
                    fgSym = containerScope.findLocal(nameText, false, false);
                    if(fgSym == null) {
                        fgSym = containerScope.findLocal(nameText, false, true);
                    }
                }
                if(fgSym) {
                    foundSymbol = true;
                    if(!funcDecl.isSignature() && (TypeScript.hasFlag(funcDecl.fncFlags, TypeScript.FncFlags.Ambient) != TypeScript.hasFlag(fgSym.flags, TypeScript.SymbolFlags.Ambient))) {
                        fgSym = null;
                    }
                }
            }
            if(fgSym == null) {
                if(!(funcDecl.isSpecialFn())) {
                    fgSym = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, null, !foundSymbol).declAST.type.symbol;
                } else {
                    fgSym = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, containerSym, false).declAST.type.symbol;
                }
                if(fgSym.declAST == null || !funcDecl.isSpecialFn()) {
                    fgSym.declAST = ast;
                }
            } else {
                if((fgSym.kind() == TypeScript.SymbolKind.Type)) {
                    fgSym = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, fgSym, false).declAST.type.symbol;
                } else {
                    context.checker.errorReporter.simpleError(funcDecl, "Function or method '" + funcDecl.name.actualText + "' already declared as a property");
                }
            }
            if(funcDecl.isSpecialFn() && !isStatic) {
                funcDecl.type = instType ? instType : fgSym.type;
            } else {
                funcDecl.type = fgSym.type;
            }
        } else {
            if(nameText) {
                if(isStatic) {
                    fgSym = containerSym.type.members.allMembers.lookup(nameText);
                } else {
                    if(funcDecl.isConstructor && context.scopeChain.previous) {
                        fgSym = context.scopeChain.previous.scope.findLocal(nameText, false, false);
                    }
                    if(fgSym == null) {
                        fgSym = containerScope.findLocal(nameText, false, false);
                    }
                }
                if(fgSym) {
                    foundSymbol = true;
                    if(!isConstructor && fgSym.declAST.nodeType == TypeScript.NodeType.FuncDecl && !(fgSym.declAST).isAccessor() && !(fgSym.declAST).isSignature()) {
                        fgSym = null;
                        foundSymbol = false;
                    }
                }
            }
            if(fgSym && !fgSym.isAccessor() && fgSym.type && fgSym.type.construct && fgSym.type.construct.signatures != [] && (fgSym.type.construct.signatures[0].declAST == null || !TypeScript.hasFlag(fgSym.type.construct.signatures[0].declAST.fncFlags, TypeScript.FncFlags.Ambient)) && !funcDecl.isConstructor) {
                context.checker.errorReporter.simpleError(funcDecl, "Functions may not have class overloads");
            }
            if(fgSym && !(fgSym.kind() == TypeScript.SymbolKind.Type) && funcDecl.isMethod() && !funcDecl.isAccessor() && !funcDecl.isConstructor) {
                context.checker.errorReporter.simpleError(funcDecl, "Function or method '" + funcDecl.name.actualText + "' already declared as a property");
                fgSym.type = context.checker.anyType;
            }
            var sig = context.checker.createFunctionSignature(funcDecl, containerSym, containerScope, fgSym, !foundSymbol);
            if(((!fgSym || fgSym.declAST.nodeType != TypeScript.NodeType.FuncDecl) && funcDecl.isAccessor()) || (fgSym && fgSym.isAccessor())) {
                funcDecl.accessorSymbol = context.checker.createAccessorSymbol(funcDecl, fgSym, containerSym.type, (funcDecl.isMethod() && isStatic), true, containerScope, containerSym);
            }
            funcDecl.type.symbol.declAST = ast;
            if(funcDecl.isConstructor) {
                go = true;
            }
            ; ;
        }
        if(isExported) {
            if(funcDecl.type.call) {
                funcDecl.type.symbol.flags |= TypeScript.SymbolFlags.Exported;
            }
            if(fgSym && !fgSym.isAccessor() && fgSym.kind() == TypeScript.SymbolKind.Type && fgSym.type.call) {
                fgSym.flags |= TypeScript.SymbolFlags.Exported;
            }
        }
        if(context.scopeChain.moduleDecl && !funcDecl.isSpecialFn()) {
            funcDecl.type.symbol.flags |= TypeScript.SymbolFlags.ModuleMember;
            funcDecl.type.symbol.declModule = context.scopeChain.moduleDecl;
        }
        if(fgSym && isOptional) {
            fgSym.flags |= TypeScript.SymbolFlags.Optional;
        }
        return go;
    }