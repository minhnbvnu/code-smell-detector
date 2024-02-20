function booleanize(node) {
                if (node.is_boolean())
                    return node;
                // !!expression
                return make_node(AST_UnaryPrefix, node, {
                    operator: "!",
                    expression: node.negate(compressor)
                });
            }