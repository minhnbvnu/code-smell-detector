function find_scopes_visible_from(scopes) {
            const found_scopes = new Set();
            for (const scope of new Set(scopes)) {
                (function bubble_up(scope) {
                    if (scope == null || found_scopes.has(scope))
                        return;
                    found_scopes.add(scope);
                    bubble_up(scope.parent_scope);
                })(scope);
            }
            return [...found_scopes];
        }