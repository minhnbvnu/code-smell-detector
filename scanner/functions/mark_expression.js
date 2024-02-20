function mark_expression(exp) {
                if (compressor.option("ie")) {
                    var sym = root_expr(exp);
                    if (sym instanceof AST_SymbolRef) sym.walk(tw);
                }
                return true;
            }