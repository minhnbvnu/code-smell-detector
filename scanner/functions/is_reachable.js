function is_reachable(scope_node, defs) {
            const find_ref = node => {
                if (node instanceof AST_SymbolRef && defs.includes(node.definition())) {
                    return walk_abort;
                }
            };
            return walk_parent(scope_node, (node, info) => {
                if (node instanceof AST_Scope && node !== scope_node) {
                    var parent = info.parent();
                    if (parent instanceof AST_Call
                        && parent.expression === node
                        // Async/Generators aren't guaranteed to sync evaluate all of
                        // their body steps, so it's possible they close over the variable.
                        && !(node.async || node.is_generator)) {
                        return;
                    }
                    if (walk(node, find_ref))
                        return walk_abort;
                    return true;
                }
            });
        }