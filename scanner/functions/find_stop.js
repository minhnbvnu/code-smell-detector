function find_stop(node, level, write_only) {
                    var parent = scanner.parent(level);
                    if (parent instanceof AST_Assign) {
                        if (write_only
                            && !parent.logical
                            && !(parent.left instanceof AST_PropAccess
                                || lvalues.has(parent.left.name))) {
                            return find_stop(parent, level + 1, write_only);
                        }
                        return node;
                    }
                    if (parent instanceof AST_Binary) {
                        if (write_only && (!lazy_op.has(parent.operator) || parent.left === node)) {
                            return find_stop(parent, level + 1, write_only);
                        }
                        return node;
                    }
                    if (parent instanceof AST_Call)
                        return node;
                    if (parent instanceof AST_Case)
                        return node;
                    if (parent instanceof AST_Conditional) {
                        if (write_only && parent.condition === node) {
                            return find_stop(parent, level + 1, write_only);
                        }
                        return node;
                    }
                    if (parent instanceof AST_Definitions) {
                        return find_stop(parent, level + 1, true);
                    }
                    if (parent instanceof AST_Exit) {
                        return write_only ? find_stop(parent, level + 1, write_only) : node;
                    }
                    if (parent instanceof AST_If) {
                        if (write_only && parent.condition === node) {
                            return find_stop(parent, level + 1, write_only);
                        }
                        return node;
                    }
                    if (parent instanceof AST_IterationStatement)
                        return node;
                    if (parent instanceof AST_Sequence) {
                        return find_stop(parent, level + 1, parent.tail_node() !== node);
                    }
                    if (parent instanceof AST_SimpleStatement) {
                        return find_stop(parent, level + 1, true);
                    }
                    if (parent instanceof AST_Switch)
                        return node;
                    if (parent instanceof AST_VarDef)
                        return node;
                    return null;
                }