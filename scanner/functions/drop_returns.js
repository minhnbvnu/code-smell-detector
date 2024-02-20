function drop_returns(compressor, exp) {
            var arrow = is_arrow(exp);
            var async = is_async(exp);
            var drop_body = false;
            if (arrow && compressor.option("arrows")) {
                if (!exp.value) {
                    drop_body = true;
                } else if (!async || is_primitive(compressor, exp.value)) {
                    exp.value = exp.value.drop_side_effect_free(compressor);
                }
            } else if (exp instanceof AST_AsyncFunction || exp instanceof AST_Function) {
                if (exp.name) {
                    var def = exp.name.definition();
                    drop_body = def.references.length == def.replaced;
                } else {
                    drop_body = true;
                }
            }
            if (drop_body) {
                exp.process_expression(false, function(node) {
                    var value = node.value;
                    if (value) {
                        if (async && !is_primitive(compressor, value)) return node;
                        value = value.drop_side_effect_free(compressor, true);
                    }
                    if (!value) return make_node(AST_EmptyStatement, node);
                    return make_node(AST_SimpleStatement, node, { body: value });
                });
                scan_local_returns(exp, function(node) {
                    var value = node.value;
                    if (value) {
                        if (async && !is_primitive(compressor, value)) return;
                        node.value = value.drop_side_effect_free(compressor);
                    }
                });
            }
            if (async && compressor.option("awaits")) {
                if (drop_body) exp.process_expression("awaits", function(node) {
                    var body = node.body;
                    if (body instanceof AST_Await) {
                        if (is_primitive(compressor, body.expression)) {
                            body = body.expression.drop_side_effect_free(compressor, true);
                            if (!body) return make_node(AST_EmptyStatement, node);
                            node.body = body;
                        }
                    } else if (body instanceof AST_Sequence) {
                        var exprs = body.expressions;
                        for (var i = exprs.length; --i >= 0;) {
                            var tail = exprs[i];
                            if (!(tail instanceof AST_Await)) break;
                            if (!is_primitive(compressor, tail.expression)) break;
                            if (exprs[i] = tail.expression.drop_side_effect_free(compressor)) break;
                        }
                        switch (i) {
                          case -1:
                            return make_node(AST_EmptyStatement, node);
                          case 0:
                            node.body = exprs[0];
                            break;
                          default:
                            exprs.length = i + 1;
                            break;
                        }
                    }
                    return node;
                });
                var abort = !drop_body && exp.name || arrow && exp.value && !is_primitive(compressor, exp.value);
                var tw = new TreeWalker(function(node) {
                    if (abort) return true;
                    if (tw.parent() === exp && node.may_throw(compressor)) return abort = true;
                    if (node instanceof AST_Await) return abort = true;
                    if (node instanceof AST_ForAwaitOf) return abort = true;
                    if (node instanceof AST_Return) {
                        if (node.value && !is_primitive(compressor, node.value)) return abort = true;
                        return;
                    }
                    if (node instanceof AST_Scope && node !== exp) return true;
                });
                exp.walk(tw);
                if (!abort) {
                    var ctor;
                    switch (exp.CTOR) {
                      case AST_AsyncArrow:
                        ctor = AST_Arrow;
                        break;
                      case AST_AsyncFunction:
                        ctor = AST_Function;
                        break;
                      case AST_AsyncGeneratorFunction:
                        ctor = AST_GeneratorFunction;
                        break;
                    }
                    return make_node(ctor, exp, exp);
                }
            }
            return drop_body && exp.clone();
        }