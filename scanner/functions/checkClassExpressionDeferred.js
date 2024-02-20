function checkClassExpressionDeferred(node) {
                forEach(node.members, checkSourceElement);
                registerForUnusedIdentifiersCheck(node);
            }