function merge_sequence(array, node) {
            if (node instanceof AST_Sequence) {
                array.push(...node.expressions);
            }
            else {
                array.push(node);
            }
            return array;
        }