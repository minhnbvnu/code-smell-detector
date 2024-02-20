function replace_all_symbols() {
                    if (side_effects)
                        return false;
                    if (value_def)
                        return true;
                    if (lhs instanceof AST_SymbolRef) {
                        var def = lhs.definition();
                        if (def.references.length - def.replaced == (candidate instanceof AST_VarDef ? 1 : 2)) {
                            return true;
                        }
                    }
                    return false;
                }