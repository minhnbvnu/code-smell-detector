function side_effects_external(node, lhs) {
                    if (node instanceof AST_Assign)
                        return side_effects_external(node.left, true);
                    if (node instanceof AST_Unary)
                        return side_effects_external(node.expression, true);
                    if (node instanceof AST_VarDef)
                        return node.value && side_effects_external(node.value);
                    if (lhs) {
                        if (node instanceof AST_Dot)
                            return side_effects_external(node.expression, true);
                        if (node instanceof AST_Sub)
                            return side_effects_external(node.expression, true);
                        if (node instanceof AST_SymbolRef)
                            return node.definition().scope.get_defun_scope() !== defun_scope;
                    }
                    return false;
                }