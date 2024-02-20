function is_last_node(node, parent) {
                if (node instanceof AST_Await) return true;
                if (node.TYPE == "Binary") return node.operator == "in" && !is_object(node.right);
                if (node instanceof AST_Call) {
                    var def, fn = node.expression;
                    if (fn instanceof AST_SymbolRef) {
                        def = fn.definition();
                        fn = fn.fixed_value();
                    }
                    if (!(fn instanceof AST_Lambda)) return !node.is_expr_pure(compressor);
                    if (def && recursive_ref(compressor, def, fn)) return true;
                    if (fn.collapse_scanning) return false;
                    fn.collapse_scanning = true;
                    var replace = can_replace;
                    can_replace = false;
                    var after = stop_after;
                    var if_hit = stop_if_hit;
                    if (!all(fn.argnames, function(argname) {
                        if (argname instanceof AST_DefaultValue) {
                            argname.value.transform(scanner);
                            if (abort) return false;
                            argname = argname.name;
                        }
                        return !(argname instanceof AST_Destructured);
                    })) {
                        abort = true;
                    } else if (is_arrow(fn) && fn.value) {
                        fn.value.transform(scanner);
                    } else for (var i = 0; !abort && i < fn.body.length; i++) {
                        var stat = fn.body[i];
                        if (stat instanceof AST_Return) {
                            if (stat.value) stat.value.transform(scanner);
                            break;
                        }
                        stat.transform(scanner);
                    }
                    stop_if_hit = if_hit;
                    stop_after = after;
                    can_replace = replace;
                    delete fn.collapse_scanning;
                    if (!abort) return false;
                    abort = false;
                    return true;
                }
                if (node instanceof AST_Exit) {
                    if (in_try) {
                        if (in_try.bfinally) return true;
                        if (in_try.bcatch && node instanceof AST_Throw) return true;
                    }
                    return side_effects || lhs instanceof AST_PropAccess || may_modify(lhs);
                }
                if (node instanceof AST_Function) {
                    return compressor.option("ie") && node.name && lvalues.has(node.name.name);
                }
                if (node instanceof AST_ObjectIdentity) return symbol_in_lvalues(node, parent);
                if (node instanceof AST_PropAccess) {
                    if (side_effects) return true;
                    var exp = node.expression;
                    if (exp instanceof AST_SymbolRef && is_arguments(exp.definition())) return true;
                    if (compressor.option("unsafe")) {
                        if (is_undeclared_ref(exp) && global_names[exp.name]) return false;
                        if (is_static_fn(exp)) return false;
                    }
                    if (!well_defined) return true;
                    if (value_def) return false;
                    if (!in_try && lhs_local) return false;
                    if (node.optional) return false;
                    return exp.may_throw_on_access(compressor);
                }
                if (node instanceof AST_Spread) return true;
                if (node instanceof AST_SymbolRef) {
                    if (symbol_in_lvalues(node, parent)) return !is_direct_assignment(node, parent);
                    if (side_effects && may_modify(node)) return true;
                    var def = node.definition();
                    return (in_try || def.scope.resolve() !== scope) && !can_drop_symbol(node);
                }
                if (node instanceof AST_Template) return !node.is_expr_pure(compressor);
                if (node instanceof AST_VarDef) {
                    if (check_destructured(node.name)) return true;
                    return (node.value || parent instanceof AST_Let) && node.name.match_symbol(function(node) {
                        return node instanceof AST_SymbolDeclaration
                            && (lvalues.has(node.name) || side_effects && may_modify(node));
                    }, true);
                }
                if (node instanceof AST_Yield) return true;
                var sym = is_lhs(node.left, node);
                if (!sym) return false;
                if (sym instanceof AST_PropAccess) return true;
                if (check_destructured(sym)) return true;
                return sym.match_symbol(function(node) {
                    return node instanceof AST_SymbolRef
                        && (lvalues.has(node.name) || read_toplevel && compressor.exposed(node.definition()));
                }, true);
            }