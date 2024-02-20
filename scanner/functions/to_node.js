function to_node(value, orig) {
                if (value instanceof AST_Node) {
                    if (!(value instanceof AST_Constant)) {
                        // Value may be a function, an array including functions and even a complex assign / block expression,
                        // so it should never be shared in different places.
                        // Otherwise wrong information may be used in the compression phase
                        value = value.clone(true);
                    }
                    return make_node(value.CTOR, orig, value);
                }
                if (Array.isArray(value))
                    return make_node(AST_Array, orig, {
                        elements: value.map(function (value) {
                            return to_node(value, orig);
                        })
                    });
                if (value && typeof value == "object") {
                    var props = [];
                    for (var key in value)
                        if (HOP(value, key)) {
                            props.push(make_node(AST_ObjectKeyVal, orig, {
                                key: key,
                                value: to_node(value[key], orig)
                            }));
                        }
                    return make_node(AST_Object, orig, {
                        properties: props
                    });
                }
                return make_node_from_constant(value, orig);
            }