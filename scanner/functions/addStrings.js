function addStrings(node, add) {
            node.walk(new TreeWalker(function (node) {
                if (node instanceof AST_Sequence) {
                    addStrings(node.tail_node(), add);
                }
                else if (node instanceof AST_String) {
                    add(node.value);
                }
                else if (node instanceof AST_Conditional) {
                    addStrings(node.consequent, add);
                    addStrings(node.alternative, add);
                }
                return true;
            }));
        }