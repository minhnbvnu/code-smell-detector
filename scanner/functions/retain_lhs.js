function retain_lhs(node) {
                if (node instanceof AST_DefaultValue) return retain_lhs(node.name);
                if (node instanceof AST_Destructured) {
                    if (value === null) {
                        value = make_node(AST_Number, node, { value: 0 });
                    } else if (value && (value.tail_node().write_only === true
                        || value.may_throw_on_access(compressor, true))) {
                        value = make_node(AST_Array, node, {
                            elements: value instanceof AST_Sequence ? value.expressions : [ value ],
                        });
                    }
                    return make_node(AST_DestructuredObject, node, { properties: [] });
                }
                node.__unused = null;
                return node;
            }