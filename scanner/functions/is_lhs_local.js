function is_lhs_local(lhs) {
                    while (lhs instanceof AST_PropAccess)
                        lhs = lhs.expression;
                    return lhs instanceof AST_SymbolRef
                        && lhs.definition().scope.get_defun_scope() === defun_scope
                        && !(in_loop
                            && (lvalues.has(lhs.name)
                                || candidate instanceof AST_Unary
                                || (candidate instanceof AST_Assign
                                    && !candidate.logical
                                    && candidate.operator != "=")));
                }