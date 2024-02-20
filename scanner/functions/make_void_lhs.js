function make_void_lhs(orig) {
            return make_node(AST_Dot, orig, {
                expression: make_node(AST_Array, orig, { elements: [] }),
                property: "e",
            });
        }