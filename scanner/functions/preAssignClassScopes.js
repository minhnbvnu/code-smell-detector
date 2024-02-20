function preAssignClassScopes(ast, context) {
        var classDecl = ast;
        var memberScope = null;
        var aggScope = null;
        if(classDecl.name && classDecl.type) {
            classDecl.name.sym = classDecl.type.symbol;
        }
        var classType = ast.type;
        if(classType) {
            var classSym = classType.symbol;
            memberScope = context.typeFlow.checker.scopeOf(classType);
            aggScope = new TypeScript.SymbolAggregateScope(classType.symbol);
            aggScope.addParentScope(memberScope);
            aggScope.addParentScope(context.scopeChain.scope);
            classType.containedScope = aggScope;
            classType.memberScope = memberScope;
            var instanceType = classType.instanceType;
            memberScope = context.typeFlow.checker.scopeOf(instanceType);
            instanceType.memberScope = memberScope;
            aggScope = new TypeScript.SymbolAggregateScope(instanceType.symbol);
            aggScope.addParentScope(context.scopeChain.scope);
            pushAssignScope(aggScope, context, instanceType, classType, null);
            instanceType.containedScope = aggScope;
        } else {
            ast.type = context.typeFlow.anyType;
        }
    }