function to_fun_args(ex, default_seen_above) {
                var insert_default = function (ex, default_value) {
                    if (default_value) {
                        return new AST_DefaultAssign({
                            start: ex.start,
                            left: ex,
                            operator: "=",
                            right: default_value,
                            end: default_value.end
                        });
                    }
                    return ex;
                };
                if (ex instanceof AST_Object) {
                    return insert_default(new AST_Destructuring({
                        start: ex.start,
                        end: ex.end,
                        is_array: false,
                        names: ex.properties.map(prop => to_fun_args(prop))
                    }), default_seen_above);
                }
                else if (ex instanceof AST_ObjectKeyVal) {
                    ex.value = to_fun_args(ex.value);
                    return insert_default(ex, default_seen_above);
                }
                else if (ex instanceof AST_Hole) {
                    return ex;
                }
                else if (ex instanceof AST_Destructuring) {
                    ex.names = ex.names.map(name => to_fun_args(name));
                    return insert_default(ex, default_seen_above);
                }
                else if (ex instanceof AST_SymbolRef) {
                    return insert_default(new AST_SymbolFunarg({
                        name: ex.name,
                        start: ex.start,
                        end: ex.end
                    }), default_seen_above);
                }
                else if (ex instanceof AST_Expansion) {
                    ex.expression = to_fun_args(ex.expression);
                    return insert_default(ex, default_seen_above);
                }
                else if (ex instanceof AST_Array) {
                    return insert_default(new AST_Destructuring({
                        start: ex.start,
                        end: ex.end,
                        is_array: true,
                        names: ex.elements.map(elm => to_fun_args(elm))
                    }), default_seen_above);
                }
                else if (ex instanceof AST_Assign) {
                    return insert_default(to_fun_args(ex.left, ex.right), default_seen_above);
                }
                else if (ex instanceof AST_DefaultAssign) {
                    ex.left = to_fun_args(ex.left);
                    return ex;
                }
                else {
                    croak("Invalid function parameter", ex.start.line, ex.start.col);
                }
            }