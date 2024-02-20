function symbol_in_lvalues(sym, parent) {
                var lvalue = lvalues.get(sym.name);
                if (!lvalue || all(lvalue, function(lhs) {
                    return !lhs;
                })) return;
                if (lvalue[0] !== lhs) return true;
                scan_rhs = false;
            }