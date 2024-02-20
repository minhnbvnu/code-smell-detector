function registerScope(scopeManager, scope) {
        scopeManager.scopes.push(scope);
        const scopes = scopeManager.nodeToScope.get(scope.block);
        if (scopes) {
            scopes.push(scope);
        }
        else {
            scopeManager.nodeToScope.set(scope.block, [scope]);
        }
    }