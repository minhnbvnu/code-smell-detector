function merge_conditional_assignments(var_def, exprs, keep) {
            if (!compressor.option("conditionals")) return;
            if (var_def.name instanceof AST_Destructured) return;
            var trimmed = false;
            var def = var_def.name.definition();
            while (exprs.length > keep) {
                var cond = to_conditional_assignment(compressor, def, var_def.value, exprs[0]);
                if (!cond) break;
                var_def.value = cond;
                exprs.shift();
                trimmed = true;
            }
            return trimmed;
        }