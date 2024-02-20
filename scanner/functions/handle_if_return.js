function handle_if_return(statements, compressor) {
                var self = compressor.self();
                var multiple_if_returns = has_multiple_if_returns(statements);
                var in_lambda = self instanceof AST_Lambda;
                for (var i = statements.length; --i >= 0;) {
                    var stat = statements[i];
                    var j = next_index(i);
                    var next = statements[j];
                    if (in_lambda && !next && stat instanceof AST_Return) {
                        if (!stat.value) {
                            CHANGED = true;
                            statements.splice(i, 1);
                            continue;
                        }
                        if (stat.value instanceof AST_UnaryPrefix && stat.value.operator == "void") {
                            CHANGED = true;
                            statements[i] = make_node(AST_SimpleStatement, stat, {
                                body: stat.value.expression
                            });
                            continue;
                        }
                    }
                    if (stat instanceof AST_If) {
                        var ab = aborts(stat.body);
                        if (can_merge_flow(ab)) {
                            if (ab.label) {
                                remove(ab.label.thedef.references, ab);
                            }
                            CHANGED = true;
                            stat = stat.clone();
                            stat.condition = stat.condition.negate(compressor);
                            var body = as_statement_array_with_return(stat.body, ab);
                            stat.body = make_node(AST_BlockStatement, stat, {
                                body: as_statement_array(stat.alternative).concat(extract_functions())
                            });
                            stat.alternative = make_node(AST_BlockStatement, stat, {
                                body: body
                            });
                            statements[i] = stat.transform(compressor);
                            continue;
                        }
                        var ab = aborts(stat.alternative);
                        if (can_merge_flow(ab)) {
                            if (ab.label) {
                                remove(ab.label.thedef.references, ab);
                            }
                            CHANGED = true;
                            stat = stat.clone();
                            stat.body = make_node(AST_BlockStatement, stat.body, {
                                body: as_statement_array(stat.body).concat(extract_functions())
                            });
                            var body = as_statement_array_with_return(stat.alternative, ab);
                            stat.alternative = make_node(AST_BlockStatement, stat.alternative, {
                                body: body
                            });
                            statements[i] = stat.transform(compressor);
                            continue;
                        }
                    }
                    if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                        var value = stat.body.value;
                        //---
                        // pretty silly case, but:
                        // if (foo()) return; return; ==> foo(); return;
                        if (!value && !stat.alternative
                            && (in_lambda && !next || next instanceof AST_Return && !next.value)) {
                            CHANGED = true;
                            statements[i] = make_node(AST_SimpleStatement, stat.condition, {
                                body: stat.condition
                            });
                            continue;
                        }
                        //---
                        // if (foo()) return x; return y; ==> return foo() ? x : y;
                        if (value && !stat.alternative && next instanceof AST_Return && next.value) {
                            CHANGED = true;
                            stat = stat.clone();
                            stat.alternative = next;
                            statements[i] = stat.transform(compressor);
                            statements.splice(j, 1);
                            continue;
                        }
                        //---
                        // if (foo()) return x; [ return ; ] ==> return foo() ? x : undefined;
                        if (value && !stat.alternative
                            && (!next && in_lambda && multiple_if_returns
                                || next instanceof AST_Return)) {
                            CHANGED = true;
                            stat = stat.clone();
                            stat.alternative = next || make_node(AST_Return, stat, {
                                value: null
                            });
                            statements[i] = stat.transform(compressor);
                            if (next)
                                statements.splice(j, 1);
                            continue;
                        }
                        //---
                        // if (a) return b; if (c) return d; e; ==> return a ? b : c ? d : void e;
                        //
                        // if sequences is not enabled, this can lead to an endless loop (issue #866).
                        // however, with sequences on this helps producing slightly better output for
                        // the example code.
                        var prev = statements[prev_index(i)];
                        if (compressor.option("sequences") && in_lambda && !stat.alternative
                            && prev instanceof AST_If && prev.body instanceof AST_Return
                            && next_index(j) == statements.length && next instanceof AST_SimpleStatement) {
                            CHANGED = true;
                            stat = stat.clone();
                            stat.alternative = make_node(AST_BlockStatement, next, {
                                body: [
                                    next,
                                    make_node(AST_Return, next, {
                                        value: null
                                    })
                                ]
                            });
                            statements[i] = stat.transform(compressor);
                            statements.splice(j, 1);
                            continue;
                        }
                    }
                }
                function has_multiple_if_returns(statements) {
                    var n = 0;
                    for (var i = statements.length; --i >= 0;) {
                        var stat = statements[i];
                        if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                            if (++n > 1)
                                return true;
                        }
                    }
                    return false;
                }
                function is_return_void(value) {
                    return !value || value instanceof AST_UnaryPrefix && value.operator == "void";
                }
                function can_merge_flow(ab) {
                    if (!ab)
                        return false;
                    for (var j = i + 1, len = statements.length; j < len; j++) {
                        var stat = statements[j];
                        if (stat instanceof AST_Const || stat instanceof AST_Let)
                            return false;
                    }
                    var lct = ab instanceof AST_LoopControl ? compressor.loopcontrol_target(ab) : null;
                    return ab instanceof AST_Return && in_lambda && is_return_void(ab.value)
                        || ab instanceof AST_Continue && self === loop_body(lct)
                        || ab instanceof AST_Break && lct instanceof AST_BlockStatement && self === lct;
                }
                function extract_functions() {
                    var tail = statements.slice(i + 1);
                    statements.length = i + 1;
                    return tail.filter(function (stat) {
                        if (stat instanceof AST_Defun) {
                            statements.push(stat);
                            return false;
                        }
                        return true;
                    });
                }
                function as_statement_array_with_return(node, ab) {
                    var body = as_statement_array(node).slice(0, -1);
                    if (ab.value) {
                        body.push(make_node(AST_SimpleStatement, ab.value, {
                            body: ab.value.expression
                        }));
                    }
                    return body;
                }
                function next_index(i) {
                    for (var j = i + 1, len = statements.length; j < len; j++) {
                        var stat = statements[j];
                        if (!(stat instanceof AST_Var && declarations_only(stat))) {
                            break;
                        }
                    }
                    return j;
                }
                function prev_index(i) {
                    for (var j = i; --j >= 0;) {
                        var stat = statements[j];
                        if (!(stat instanceof AST_Var && declarations_only(stat))) {
                            break;
                        }
                    }
                    return j;
                }
            }