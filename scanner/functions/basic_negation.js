function basic_negation(exp) {
                return make_node(AST_UnaryPrefix, exp, {
                    operator: "!",
                    expression: exp
                });
            }