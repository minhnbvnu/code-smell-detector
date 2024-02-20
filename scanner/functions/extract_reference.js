function extract_reference(node, props) {
                if (node instanceof AST_PropAccess) {
                    var expr = node.expression;
                    if (!expr.may_throw_on_access(compressor, true)) {
                        nested = true;
                        if (props && node instanceof AST_Sub) props.unshift(node.property);
                        return extract_reference(expr, props);
                    }
                } else if (node instanceof AST_Assign && node.operator == "=") {
                    node.write_only = "p";
                    var ref = extract_reference(node.right);
                    if (!props) return ref;
                    props.assign = node;
                    return ref instanceof AST_SymbolRef ? ref : node.left;
                }
                return node;
            }