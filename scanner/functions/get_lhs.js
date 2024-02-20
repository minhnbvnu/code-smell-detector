function get_lhs(expr) {
                    if (expr instanceof AST_Assign && expr.logical) {
                        return false;
                    }
                    else if (expr instanceof AST_VarDef && expr.name instanceof AST_SymbolDeclaration) {
                        var def = expr.name.definition();
                        if (!member(expr.name, def.orig))
                            return;
                        var referenced = def.references.length - def.replaced;
                        if (!referenced)
                            return;
                        var declared = def.orig.length - def.eliminated;
                        if (declared > 1 && !(expr.name instanceof AST_SymbolFunarg)
                            || (referenced > 1 ? mangleable_var(expr) : !compressor.exposed(def))) {
                            return make_node(AST_SymbolRef, expr.name, expr.name);
                        }
                    }
                    else {
                        const lhs = expr instanceof AST_Assign
                            ? expr.left
                            : expr.expression;
                        return !is_ref_of(lhs, AST_SymbolConst)
                            && !is_ref_of(lhs, AST_SymbolLet) && lhs;
                    }
                }