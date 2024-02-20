function rename_def(fn, name) {
                        if (!fn.name) return null;
                        var def = fn.name.definition();
                        if (def.orig.length > 1) return null;
                        if (def.assignments > 0) return false;
                        if (def.name == name) return def;
                        var forbidden;
                        switch (name) {
                          case "await":
                            forbidden = is_async;
                            break;
                          case "yield":
                            forbidden = is_generator;
                            break;
                        }
                        return all(def.references, function(ref) {
                            var scope = ref.scope;
                            if (scope.find_variable(name) !== sym) return false;
                            if (forbidden) do {
                                scope = scope.resolve();
                                if (forbidden(scope)) return false;
                            } while (scope !== fn && (scope = scope.parent_scope));
                            return true;
                        }) && def;
                    }