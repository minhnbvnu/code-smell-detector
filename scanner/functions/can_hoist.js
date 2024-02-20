function can_hoist(sym, right, count) {
            if (!(sym instanceof AST_Symbol)) return;
            var def = sym.definition();
            if (def.assignments != count) return;
            if (def.references.length - def.replaced == count) return;
            if (def.single_use) return;
            if (top_retain(def)) return;
            if (sym.fixed_value() !== right) return;
            var fixed = sym.fixed || def.fixed;
            if (fixed.direct_access) return;
            if (fixed.escaped && fixed.escaped.depth == 1) return;
            return right instanceof AST_Object
                && right.properties.length > 0
                && all(right.properties, can_hoist_property)
                && can_drop_symbol(sym, compressor);
        }