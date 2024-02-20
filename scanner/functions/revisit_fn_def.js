function revisit_fn_def(tw, fn) {
            fn.enclosed.forEach(function(d) {
                if (fn.variables.get(d.name) === d) return;
                if (safe_to_read(tw, d)) return;
                d.single_use = false;
                var fixed = d.fixed;
                if (typeof fixed == "function") fixed = fixed();
                if (fixed instanceof AST_Lambda && HOP(fixed, "safe_ids")) return;
                d.fixed = false;
            });
        }