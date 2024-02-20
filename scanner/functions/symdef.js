function symdef(def) {
                var ret = (1e6 + def.id) + " " + def.name;
                if (def.mangled_name)
                    ret += " " + def.mangled_name;
                return ret;
            }