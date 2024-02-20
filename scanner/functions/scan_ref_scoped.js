function scan_ref_scoped(node, descend) {
                var node_def;
                const sym = assign_as_unused(node);
                if (sym instanceof AST_SymbolRef
                    && !is_ref_of(node.left, AST_SymbolBlockDeclaration)
                    && self.variables.get(sym.name) === (node_def = sym.definition())) {
                    if (node instanceof AST_Assign) {
                        node.right.walk(tw);
                        if (!node_def.chained && node.left.fixed_value() === node.right) {
                            fixed_ids.set(node_def.id, node);
                        }
                    }
                    return true;
                }
                if (node instanceof AST_SymbolRef) {
                    node_def = node.definition();
                    if (!in_use_ids.has(node_def.id)) {
                        in_use_ids.set(node_def.id, node_def);
                        if (node_def.orig[0] instanceof AST_SymbolCatch) {
                            const redef = node_def.scope.is_block_scope()
                                && node_def.scope.get_defun_scope().variables.get(node_def.name);
                            if (redef)
                                in_use_ids.set(redef.id, redef);
                        }
                    }
                    return true;
                }
                if (node instanceof AST_Scope) {
                    var save_scope = scope;
                    scope = node;
                    descend();
                    scope = save_scope;
                    return true;
                }
            }