function skip_string(node) {
                if (node instanceof AST_String) {
                    nth_identifier.consider(node.value, -1);
                }
                else if (node instanceof AST_Conditional) {
                    skip_string(node.consequent);
                    skip_string(node.alternative);
                }
                else if (node instanceof AST_Sequence) {
                    skip_string(node.tail_node());
                }
            }