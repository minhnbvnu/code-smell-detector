function check_assignment(lhs) {
                    if (may_throw(parent)) return node;
                    if (lhs !== node && lhs instanceof AST_Destructured) {
                        return find_stop_expr(lhs, find_stop_unused, node, parent, level);
                    }
                    return find_stop_unused(parent, level + 1);
                }