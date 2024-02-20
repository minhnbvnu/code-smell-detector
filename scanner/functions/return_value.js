function return_value(stat) {
                if (!stat)
                    return make_node(AST_Undefined, self);
                if (stat instanceof AST_Return) {
                    if (!stat.value)
                        return make_node(AST_Undefined, self);
                    return stat.value.clone(true);
                }
                if (stat instanceof AST_SimpleStatement) {
                    return make_node(AST_UnaryPrefix, stat, {
                        operator: "void",
                        expression: stat.body.clone(true)
                    });
                }
            }