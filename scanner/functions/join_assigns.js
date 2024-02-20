function join_assigns(defn, body, keep) {
            var exprs = extract_exprs(body);
            if (!exprs) return;
            var trimmed = false;
            for (var i = exprs.length - (keep || 0); --i >= 0;) {
                var expr = exprs[i];
                if (!can_trim(expr)) continue;
                var tail;
                if (expr.left instanceof AST_SymbolRef) {
                    tail = exprs.slice(i + 1);
                } else if (expr.left instanceof AST_PropAccess && can_trim(expr.left.expression)) {
                    tail = exprs.slice(i + 1);
                    var flattened = expr.clone();
                    expr = expr.left.expression;
                    flattened.left = flattened.left.clone();
                    flattened.left.expression = expr.left.clone();
                    tail.unshift(flattened);
                } else {
                    continue;
                }
                if (tail.length == 0) continue;
                if (!trim_assigns(expr.left, expr.right, tail)) continue;
                trimmed = true;
                exprs = exprs.slice(0, i).concat(expr, tail);
            }
            if (defn instanceof AST_Definitions) {
                keep = keep || 0;
                for (var i = defn.definitions.length; --i >= 0;) {
                    var def = defn.definitions[i];
                    if (!def.value) continue;
                    if (trim_assigns(def.name, def.value, exprs)) trimmed = true;
                    if (merge_conditional_assignments(def, exprs, keep)) trimmed = true;
                    break;
                }
                if (defn instanceof AST_Var && join_var_assign(defn.definitions, exprs, keep)) trimmed = true;
            }
            return trimmed && exprs;

            function can_trim(node) {
                return node instanceof AST_Assign && node.operator == "=";
            }
        }