function safe_to_trim(stat) {
        if (stat instanceof AST_LambdaDefinition) {
            var def = stat.name.definition();
            var scope = stat.name.scope;
            return def.scope === scope || all(def.references, function(ref) {
                var s = ref.scope;
                do {
                    if (s === scope) return true;
                } while (s = s.parent_scope);
            });
        }
        return !is_lexical_definition(stat);
    }