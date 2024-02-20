function nodeIsTupleType(node) {
                const nodeType = getNodeType(node);
                return checker.isTupleType(nodeType);
            }