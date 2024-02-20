function updateTypePredicateNode(node, assertsModifier, parameterName, type) {
                return node.assertsModifier !== assertsModifier || node.parameterName !== parameterName || node.type !== type ? update(createTypePredicateNode(assertsModifier, parameterName, type), node) : node;
            }