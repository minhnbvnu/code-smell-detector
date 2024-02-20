function preAssignWithScopes(ast, context) {
        var withStmt = ast;
        var withType = withStmt.type;
        var members = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
        var ambientMembers = new TypeScript.ScopedMembers(new TypeScript.DualStringHashTable(new TypeScript.StringHashTable(), new TypeScript.StringHashTable()));
        var withType = new TypeScript.Type();
        var withSymbol = new TypeScript.WithSymbol(withStmt.minChar, context.typeFlow.checker.locationInfo.unitIndex, withType);
        withType.members = members;
        withType.ambientMembers = ambientMembers;
        withType.symbol = withSymbol;
        withType.setHasImplementation();
        withStmt.type = withType;
        var withScope = new TypeScript.SymbolScopeBuilder(withType.members, withType.ambientMembers, null, null, context.scopeChain.scope, withType.symbol);
        pushAssignScope(withScope, context, null, null, null);
        withType.containedScope = withScope;
    }