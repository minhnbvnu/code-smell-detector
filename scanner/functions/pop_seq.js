function pop_seq(node) {
            if (!(node instanceof AST_Sequence)) return make_node(AST_Number, node, {
                value: 0
            });
            return make_sequence(node, node.expressions.slice(0, -1));
        }