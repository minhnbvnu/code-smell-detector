function nodeIsArrayType(node) {
                const nodeType = getNodeType(node);
                return checker.isArrayType(nodeType);
            }