function safe_to_read(tw, def) {
            if (def.single_use == "m")
                return false;
            if (tw.safe_ids[def.id]) {
                if (def.fixed == null) {
                    var orig = def.orig[0];
                    if (orig instanceof AST_SymbolFunarg || orig.name == "arguments")
                        return false;
                    def.fixed = make_node(AST_Undefined, orig);
                }
                return true;
            }
            return def.fixed instanceof AST_Defun;
        }