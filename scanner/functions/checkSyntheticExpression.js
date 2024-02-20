function checkSyntheticExpression(node) {
                return node.isSpread ? getIndexedAccessType(node.type, numberType) : node.type;
            }