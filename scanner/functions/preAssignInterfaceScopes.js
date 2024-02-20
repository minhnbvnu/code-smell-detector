function preAssignInterfaceScopes(ast, context) {
        var interfaceDecl = ast;
        var memberScope = null;
        var aggScope = null;
        if(interfaceDecl.name && interfaceDecl.type) {
            interfaceDecl.name.sym = interfaceDecl.type.symbol;
        }
        var interfaceType = ast.type;
        memberScope = context.typeFlow.checker.scopeOf(interfaceType);
        interfaceType.memberScope = memberScope;
        aggScope = new TypeScript.SymbolAggregateScope(interfaceType.symbol);
        aggScope.addParentScope(memberScope);
        aggScope.addParentScope(context.scopeChain.scope);
        pushAssignScope(aggScope, context, null, null, null);
        interfaceType.containedScope = aggScope;
    }