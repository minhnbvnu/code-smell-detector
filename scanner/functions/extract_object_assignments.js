function extract_object_assignments(value) {
                    statements[++j] = stat;
                    var exprs = join_object_assignments(prev, value);
                    if (exprs) {
                        CHANGED = true;
                        if (exprs.length) {
                            return make_sequence(value, exprs);
                        }
                        else if (value instanceof AST_Sequence) {
                            return value.tail_node().left;
                        }
                        else {
                            return value.left;
                        }
                    }
                    return value;
                }