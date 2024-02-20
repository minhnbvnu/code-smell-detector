function make_sym(type, sym, key) {
                var new_var = self.make_var(type, sym, sym.name + "_" + key);
                defs.set(key, new_var.definition());
                return new_var;
            }