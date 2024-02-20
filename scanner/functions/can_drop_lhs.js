function can_drop_lhs(sym, node) {
            var def = sym.definition();
            var in_use = in_use_ids[def.id];
            if (!in_use) return true;
            if (node[node instanceof AST_Assign ? "left" : "expression"] !== sym) return false;
            return in_use === sym && def.references.length - def.replaced == 1 || indexOf_assign(def, node) < 0;
        }