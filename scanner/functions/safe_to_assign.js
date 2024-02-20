function safe_to_assign(tw, def, scope, value) {
            if (def.fixed === undefined)
                return true;
            let def_safe_ids;
            if (def.fixed === null
                && (def_safe_ids = tw.defs_to_safe_ids.get(def.id))) {
                def_safe_ids[def.id] = false;
                tw.defs_to_safe_ids.delete(def.id);
                return true;
            }
            if (!HOP(tw.safe_ids, def.id))
                return false;
            if (!safe_to_read(tw, def))
                return false;
            if (def.fixed === false)
                return false;
            if (def.fixed != null && (!value || def.references.length > def.assignments))
                return false;
            if (def.fixed instanceof AST_Defun) {
                return value instanceof AST_Node && def.fixed.parent_scope === scope;
            }
            return def.orig.every((sym) => {
                return !(sym instanceof AST_SymbolConst
                    || sym instanceof AST_SymbolDefun
                    || sym instanceof AST_SymbolLambda);
            });
        }