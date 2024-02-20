function has_overlapping_symbol(fn, arg, fn_strict) {
                    var found = false, scan_this = !(fn instanceof AST_Arrow);
                    arg.walk(new TreeWalker(function (node, descend) {
                        if (found)
                            return true;
                        if (node instanceof AST_SymbolRef && (fn.variables.has(node.name) || redefined_within_scope(node.definition(), fn))) {
                            var s = node.definition().scope;
                            if (s !== defun_scope)
                                while (s = s.parent_scope) {
                                    if (s === defun_scope)
                                        return true;
                                }
                            return found = true;
                        }
                        if ((fn_strict || scan_this) && node instanceof AST_This) {
                            return found = true;
                        }
                        if (node instanceof AST_Scope && !(node instanceof AST_Arrow)) {
                            var prev = scan_this;
                            scan_this = false;
                            descend();
                            scan_this = prev;
                            return true;
                        }
                    }));
                    return found;
                }