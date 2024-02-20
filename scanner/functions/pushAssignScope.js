function pushAssignScope(scope, context, type, classType, fnc) {
        var chain = new TypeScript.ScopeChain(null, context.scopeChain, scope);
        chain.thisType = type;
        chain.classType = classType;
        chain.fnc = fnc;
        context.scopeChain = chain;
    }