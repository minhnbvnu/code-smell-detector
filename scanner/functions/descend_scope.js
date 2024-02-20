function descend_scope() {
                var save_scope = scope;
                scope = node;
                descend(node, tt);
                scope = save_scope;
            }