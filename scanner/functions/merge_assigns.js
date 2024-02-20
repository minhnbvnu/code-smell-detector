function merge_assigns(prev, defn) {
            if (!(prev instanceof AST_SimpleStatement)) return;
            if (declarations_only(defn)) return;
            var exprs = extract_exprs(prev.body);
            if (!exprs) return;
            var definitions = [];
            if (!join_var_assign(definitions, exprs.reverse(), 0)) return;
            defn.definitions = definitions.reverse().concat(defn.definitions);
            return exprs.reverse();
        }