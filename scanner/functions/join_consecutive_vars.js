function join_consecutive_vars(statements) {
                var defs;
                for (var i = 0, j = -1, len = statements.length; i < len; i++) {
                    var stat = statements[i];
                    var prev = statements[j];
                    if (stat instanceof AST_Definitions) {
                        if (prev && prev.TYPE == stat.TYPE) {
                            prev.definitions = prev.definitions.concat(stat.definitions);
                            CHANGED = true;
                        }
                        else if (defs && defs.TYPE == stat.TYPE && declarations_only(stat)) {
                            defs.definitions = defs.definitions.concat(stat.definitions);
                            CHANGED = true;
                        }
                        else {
                            statements[++j] = stat;
                            defs = stat;
                        }
                    }
                    else if (stat instanceof AST_Exit) {
                        stat.value = extract_object_assignments(stat.value);
                    }
                    else if (stat instanceof AST_For) {
                        var exprs = join_object_assignments(prev, stat.init);
                        if (exprs) {
                            CHANGED = true;
                            stat.init = exprs.length ? make_sequence(stat.init, exprs) : null;
                            statements[++j] = stat;
                        }
                        else if (prev instanceof AST_Var
                            && (!stat.init || stat.init.TYPE == prev.TYPE)) {
                            if (stat.init) {
                                prev.definitions = prev.definitions.concat(stat.init.definitions);
                            }
                            stat.init = prev;
                            statements[j] = stat;
                            CHANGED = true;
                        }
                        else if (defs instanceof AST_Var
                            && stat.init instanceof AST_Var
                            && declarations_only(stat.init)) {
                            defs.definitions = defs.definitions.concat(stat.init.definitions);
                            stat.init = null;
                            statements[++j] = stat;
                            CHANGED = true;
                        }
                        else {
                            statements[++j] = stat;
                        }
                    }
                    else if (stat instanceof AST_ForIn) {
                        stat.object = extract_object_assignments(stat.object);
                    }
                    else if (stat instanceof AST_If) {
                        stat.condition = extract_object_assignments(stat.condition);
                    }
                    else if (stat instanceof AST_SimpleStatement) {
                        var exprs = join_object_assignments(prev, stat.body);
                        if (exprs) {
                            CHANGED = true;
                            if (!exprs.length)
                                continue;
                            stat.body = make_sequence(stat.body, exprs);
                        }
                        statements[++j] = stat;
                    }
                    else if (stat instanceof AST_Switch) {
                        stat.expression = extract_object_assignments(stat.expression);
                    }
                    else if (stat instanceof AST_With) {
                        stat.expression = extract_object_assignments(stat.expression);
                    }
                    else {
                        statements[++j] = stat;
                    }
                }
                statements.length = j + 1;
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
            }