function preAssignCatchScopes(ast, context) {
        var catchBlock = ast;
        if(catchBlock.param) {
            var catchTable = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
            var catchLocals = new TypeScript.SymbolScopeBuilder(catchTable, null, null, null, context.scopeChain.scope, context.scopeChain.scope.container);
            catchBlock.containedScope = catchLocals;
            pushAssignScope(catchLocals, context, context.scopeChain.thisType, context.scopeChain.classType, context.scopeChain.fnc);
        }
    }