function declaredNameInScope(node) {
                Debug.assertNode(node.name, isIdentifier);
                return node.name.escapedText;
            }