function parameterVisitor(node) {
                Debug.assertNode(node, isParameter);
                return visitParameter(node);
            }