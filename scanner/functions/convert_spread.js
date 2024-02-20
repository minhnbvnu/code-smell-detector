function convert_spread(node) {
            return node instanceof AST_Spread ? make_node(AST_Array, node, {
                elements: [ node ]
            }) : node;
        }