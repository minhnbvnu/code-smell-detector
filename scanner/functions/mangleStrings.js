function mangleStrings(node) {
                return node.transform(new TreeTransformer(function (node) {
                    if (node instanceof AST_Sequence) {
                        var last = node.expressions.length - 1;
                        node.expressions[last] = mangleStrings(node.expressions[last]);
                    }
                    else if (node instanceof AST_String) {
                        node.value = mangle(node.value);
                    }
                    else if (node instanceof AST_Conditional) {
                        node.consequent = mangleStrings(node.consequent);
                        node.alternative = mangleStrings(node.alternative);
                    }
                    return node;
                }));
            }