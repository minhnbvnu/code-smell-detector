function same_scope(def) {
        var scope = def.scope.resolve();
        return all(def.references, function(ref) {
            return scope === ref.scope.resolve();
        });
    }