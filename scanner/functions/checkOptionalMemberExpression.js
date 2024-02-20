function checkOptionalMemberExpression(node) {
                checkOptionalChain(node, node.object, node.computed ? '' : '.');
            }