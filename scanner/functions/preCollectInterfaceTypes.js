function preCollectInterfaceTypes(ast, parent, context) {
        var scopeChain = context.scopeChain;
        var interfaceDecl = ast;
        var interfaceSymbol = null;
        var interfaceType = null;
        var isExported = TypeScript.hasFlag(interfaceDecl.varFlags, TypeScript.VarFlags.Exported);
        var isGlobal = context.scopeChain.container == context.checker.gloMod;
        var alreadyInScope = true;
        alreadyInScope = false;
        var interfaceName = (interfaceDecl.name).text;
        interfaceSymbol = scopeChain.scope.findLocal(interfaceName, false, true);
        if(interfaceSymbol == null) {
            interfaceType = new TypeScript.Type();
            interfaceSymbol = new TypeScript.TypeSymbol(interfaceName, interfaceDecl.name.minChar, interfaceName.length, context.checker.locationInfo.unitIndex, interfaceType);
            interfaceType.symbol = interfaceSymbol;
            interfaceType.members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            interfaceType.ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            interfaceSymbol.declAST = interfaceDecl;
            interfaceSymbol.declModule = context.scopeChain.moduleDecl;
        } else {
            alreadyInScope = true;
            interfaceType = interfaceSymbol.type;
        }
        if(!interfaceType) {
            interfaceType = context.checker.anyType;
        }
        ast.type = interfaceType;
        getBases(interfaceType, interfaceDecl);
        if(isExported) {
            interfaceSymbol.flags |= TypeScript.SymbolFlags.Exported;
        }
        if(context.scopeChain.moduleDecl) {
            interfaceSymbol.flags |= TypeScript.SymbolFlags.ModuleMember;
        }
        if(!alreadyInScope) {
            context.scopeChain.scope.enter(context.scopeChain.container, ast, interfaceSymbol, context.checker.errorReporter, isGlobal || isExported, true, false);
        }
        TypeScript.pushTypeCollectionScope(interfaceSymbol, interfaceType.members, interfaceType.ambientMembers, null, null, context, interfaceType, null, null);
        return true;
    }