function find_stop_unused(node, level) {
                var parent = scanner.parent(level);
                if (is_last_node(node, parent)) return node;
                if (in_conditional(node, parent)) return node;
                if (parent instanceof AST_Array) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Assign) return check_assignment(parent.left);
                if (parent instanceof AST_Await) return node;
                if (parent instanceof AST_Binary) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Call) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Case) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Conditional) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Definitions) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Exit) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_If) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_IterationStatement) return node;
                if (parent instanceof AST_ObjectProperty) {
                    var obj = scanner.parent(level + 1);
                    return all(obj.properties, function(prop) {
                        return prop instanceof AST_ObjectKeyVal;
                    }) ? find_stop_unused(obj, level + 2) : obj;
                }
                if (parent instanceof AST_PropAccess) {
                    var exp = parent.expression;
                    if (exp === node) return find_stop_unused(parent, level + 1);
                    return find_stop_expr(exp, find_stop_unused, node, parent, level);
                }
                if (parent instanceof AST_Sequence) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_SimpleStatement) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Spread) return node;
                if (parent instanceof AST_Switch) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_Unary) return find_stop_unused(parent, level + 1);
                if (parent instanceof AST_VarDef) return check_assignment(parent.name);
                if (parent instanceof AST_Yield) return node;
                return null;

                function check_assignment(lhs) {
                    if (may_throw(parent)) return node;
                    if (lhs !== node && lhs instanceof AST_Destructured) {
                        return find_stop_expr(lhs, find_stop_unused, node, parent, level);
                    }
                    return find_stop_unused(parent, level + 1);
                }
            }