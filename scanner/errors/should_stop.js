function should_stop(node, parent) {
                if (node === rvalue) return true;
                if (parent instanceof AST_For) {
                    if (node !== parent.init) return true;
                }
                if (node instanceof AST_Assign) {
                    return node.operator != "=" && lhs.equivalent_to(node.left);
                }
                if (node instanceof AST_Call) {
                    if (!(lhs instanceof AST_PropAccess)) return false;
                    if (!lhs.equivalent_to(node.expression)) return false;
                    return !(rvalue instanceof AST_LambdaExpression && !rvalue.contains_this());
                }
                if (node instanceof AST_Class) return !compressor.has_directive("use strict");
                if (node instanceof AST_Debugger) return true;
                if (node instanceof AST_Defun) return funarg && lhs.name === node.name.name;
                if (node instanceof AST_DestructuredKeyVal) return node.key instanceof AST_Node;
                if (node instanceof AST_DWLoop) return true;
                if (node instanceof AST_LoopControl) return true;
                if (node instanceof AST_SymbolRef) {
                    if (node.is_declared(compressor)) {
                        if (node.fixed_value()) return false;
                        if (can_drop_symbol(node)) {
                            return !(parent instanceof AST_PropAccess && parent.expression === node)
                                && is_arguments(node.definition());
                        }
                    } else if (is_direct_assignment(node, parent)) {
                        return false;
                    }
                    if (!replace_all) return true;
                    scan_rhs = false;
                    return false;
                }
                if (node instanceof AST_Try) return true;
                if (node instanceof AST_With) return true;
                return false;
            }