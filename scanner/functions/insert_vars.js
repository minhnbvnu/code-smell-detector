function insert_vars(body) {
            while (body.length) {
                var stat = body[0];
                if (stat instanceof AST_SimpleStatement) {
                    var expr = stat.body, sym, assign;
                    if (expr instanceof AST_Assign
                        && expr.operator == "="
                        && (sym = expr.left) instanceof AST_Symbol
                        && vars.has(sym.name)) {
                        var def = vars.get(sym.name);
                        if (def.value) break;
                        var value = expr.right;
                        if (value instanceof AST_Sequence) value = value.clone();
                        def.value = value;
                        remove(defs, def);
                        defs.push(def);
                        body.shift();
                        continue;
                    }
                    if (expr instanceof AST_Sequence
                        && (assign = expr.expressions[0]) instanceof AST_Assign
                        && assign.operator == "="
                        && (sym = assign.left) instanceof AST_Symbol
                        && vars.has(sym.name)) {
                        var def = vars.get(sym.name);
                        if (def.value) break;
                        def.value = assign.right;
                        remove(defs, def);
                        defs.push(def);
                        stat.body = make_sequence(expr, expr.expressions.slice(1));
                        continue;
                    }
                }
                if (stat instanceof AST_EmptyStatement) {
                    body.shift();
                    continue;
                }
                if (stat instanceof AST_BlockStatement && !insert_vars(stat.body)) {
                    body.shift();
                    continue;
                }
                break;
            }
            return body.length;
        }