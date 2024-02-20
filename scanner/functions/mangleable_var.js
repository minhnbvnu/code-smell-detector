function mangleable_var(var_def) {
                    var value = var_def.value;
                    if (!(value instanceof AST_SymbolRef))
                        return;
                    if (value.name == "arguments")
                        return;
                    var def = value.definition();
                    if (def.undeclared)
                        return;
                    return value_def = def;
                }