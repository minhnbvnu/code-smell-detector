function pushTypeCollectionScope(container, valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, context, thisType, classType, moduleDecl) {
        var builder = new TypeScript.SymbolScopeBuilder(valueMembers, ambientValueMembers, enclosedTypes, ambientEnclosedTypes, null, container);
        var chain = new TypeScript.ScopeChain(container, context.scopeChain, builder);
        chain.thisType = thisType;
        chain.classType = classType;
        chain.moduleDecl = moduleDecl;
        context.scopeChain = chain;
    }