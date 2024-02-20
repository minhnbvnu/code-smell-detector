function make_node_from_constant(val, orig) {
            switch (typeof val) {
                case "string":
                    return make_node(AST_String, orig, {
                        value: val
                    });
                case "number":
                    if (isNaN(val))
                        return make_node(AST_NaN, orig);
                    if (isFinite(val)) {
                        return 1 / val < 0 ? make_node(AST_UnaryPrefix, orig, {
                            operator: "-",
                            expression: make_node(AST_Number, orig, { value: -val })
                        }) : make_node(AST_Number, orig, { value: val });
                    }
                    return val < 0 ? make_node(AST_UnaryPrefix, orig, {
                        operator: "-",
                        expression: make_node(AST_Infinity, orig)
                    }) : make_node(AST_Infinity, orig);
                case "boolean":
                    return make_node(val ? AST_True : AST_False, orig);
                case "undefined":
                    return make_node(AST_Undefined, orig);
                default:
                    if (val === null) {
                        return make_node(AST_Null, orig, { value: null });
                    }
                    if (val instanceof RegExp) {
                        return make_node(AST_RegExp, orig, {
                            value: {
                                source: regexp_source_fix(val.source),
                                flags: val.flags
                            }
                        });
                    }
                    throw new Error(string_template("Can't handle constant of type: {type}", {
                        type: typeof val
                    }));
            }
        }