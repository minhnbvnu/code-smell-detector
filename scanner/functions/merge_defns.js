function merge_defns(stat) {
                return stat.transform(new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_Definitions) {
                        if (defs === node) return node;
                        if (defs.TYPE != node.TYPE) return node;
                        var parent = this.parent();
                        if (parent instanceof AST_ForEnumeration && parent.init === node) return node;
                        if (!declarations_only(node)) return node;
                        defs.definitions = defs.definitions.concat(node.definitions);
                        CHANGED = true;
                        if (parent instanceof AST_For && parent.init === node) return null;
                        return in_list ? List.skip : make_node(AST_EmptyStatement, node);
                    }
                    if (node instanceof AST_ExportDeclaration) return node;
                    if (node instanceof AST_Scope) return node;
                    if (!is_statement(node)) return node;
                }));
            }