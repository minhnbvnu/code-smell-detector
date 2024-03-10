function preCollectClassTypes(ast, parent, context) {
        var scopeChain = context.scopeChain;
        var classDecl = ast;
        var classType;
        var instanceType;
        var typeSymbol = null;
        var className = (classDecl.name).text;
        var alreadyInScope = false;
        var isAmbient = TypeScript.hasFlag(classDecl.varFlags, TypeScript.VarFlags.Ambient);
        var isExported = TypeScript.hasFlag(classDecl.varFlags, TypeScript.VarFlags.Exported);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var containerMod = scopeChain.container;
        var foundValSymbol = false;
        typeSymbol = scopeChain.scope.findLocal(className, false, true);
        if(!typeSymbol) {
            var valTypeSymbol = scopeChain.scope.findLocal(className, false, false);
            if(valTypeSymbol && valTypeSymbol.isType() && valTypeSymbol.declAST && valTypeSymbol.declAST.nodeType == TypeScript.NodeType.FuncDecl && (valTypeSymbol.declAST).isSignature()) {
                typeSymbol = valTypeSymbol;
                foundValSymbol = true;
                if(isExported) {
                    typeSymbol.flags |= TypeScript.SymbolFlags.Exported;
                }
                if(isAmbient) {
                    typeSymbol.flags |= TypeScript.SymbolFlags.Ambient;
                }
                context.scopeChain.scope.enter(context.scopeChain.container, ast, typeSymbol, context.checker.errorReporter, isExported || isGlobal, true, isAmbient);
            }
        }
        if(typeSymbol && !foundValSymbol && (typeSymbol.declAST != classDecl)) {
            typeSymbol = null;
        }
        if(typeSymbol == null) {
            var valueSymbol = scopeChain.scope.findLocal(className, false, false);
            classType = new TypeScript.Type();
            classType.setHasImplementation();
            instanceType = new TypeScript.Type();
            instanceType.setHasImplementation();
            classType.instanceType = instanceType;
            classType.members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            classType.ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            addPrototypeField(classType, classDecl, context);
            instanceType.members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            instanceType.ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            typeSymbol = new TypeScript.TypeSymbol(className, classDecl.name.minChar, className.length, context.checker.locationInfo.unitIndex, classType);
            typeSymbol.declAST = classDecl;
            typeSymbol.instanceType = instanceType;
            classType.symbol = typeSymbol;
            instanceType.symbol = typeSymbol;
            if(context.scopeChain.moduleDecl) {
                context.scopeChain.moduleDecl.recordNonInterface();
                typeSymbol.declModule = context.scopeChain.moduleDecl;
                typeSymbol.flags |= TypeScript.SymbolFlags.ModuleMember;
            }
            if(isExported) {
                typeSymbol.flags |= TypeScript.SymbolFlags.Exported;
            }
            if(isAmbient) {
                typeSymbol.flags |= TypeScript.SymbolFlags.Ambient;
            }
            ast.type = classType;
            context.scopeChain.scope.enter(context.scopeChain.container, ast, typeSymbol, context.checker.errorReporter, isExported || isGlobal, true, isAmbient);
            if(valueSymbol == null) {
                context.scopeChain.scope.enter(context.scopeChain.container, ast, typeSymbol, context.checker.errorReporter, isExported || isGlobal, false, isAmbient);
            }
        } else {
            classType = typeSymbol.type;
            if(classType.instanceType == null) {
                classType.instanceType = new TypeScript.Type();
                classType.instanceType.setHasImplementation();
                classType.instanceType.members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
                classType.instanceType.symbol = classType.symbol;
                classType.members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
                classType.ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            }
            instanceType = classType.instanceType;
            ast.type = classType;
        }
        if(!classDecl.constructorDecl) {
            if(typeSymbol && typeSymbol.declAST && typeSymbol.declAST.type && typeSymbol.declAST.type.call && !(typeSymbol.declAST).isOverload) {
                context.checker.errorReporter.duplicateIdentifier(typeSymbol.declAST, typeSymbol.name);
            }
            createNewConstructGroupForType(classDecl.type);
        }
        classType.typeFlags |= TypeScript.TypeFlags.IsClass;
        instanceType.typeFlags |= TypeScript.TypeFlags.IsClass;
        getBases(instanceType, classDecl);
        TypeScript.pushTypeCollectionScope(typeSymbol, instanceType.members, instanceType.ambientMembers, null, null, context, instanceType, classType, null);
        return true;
    }