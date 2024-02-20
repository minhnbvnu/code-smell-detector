function preAssignModuleScopes(ast, context) {
        var moduleDecl = ast;
        var memberScope = null;
        var aggScope = null;
        if(moduleDecl.name && moduleDecl.mod) {
            moduleDecl.name.sym = moduleDecl.mod.symbol;
        }
        var mod = moduleDecl.mod;
        if(!mod) {
            return;
        }
        memberScope = new TypeScript.SymbolTableScope(mod.members, mod.ambientMembers, mod.enclosedTypes, mod.ambientEnclosedTypes, mod.symbol);
        mod.memberScope = memberScope;
        context.modDeclChain.push(moduleDecl);
        context.typeFlow.checker.currentModDecl = moduleDecl;
        aggScope = new TypeScript.SymbolAggregateScope(mod.symbol);
        aggScope.addParentScope(memberScope);
        aggScope.addParentScope(context.scopeChain.scope);
        pushAssignScope(aggScope, context, null, null, null);
        mod.containedScope = aggScope;
        if(mod.symbol) {
            context.typeFlow.addLocalsFromScope(mod.containedScope, mod.symbol, moduleDecl.vars, mod.members.privateMembers, true);
        }
    }