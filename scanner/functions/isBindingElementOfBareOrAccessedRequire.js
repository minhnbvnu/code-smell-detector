function isBindingElementOfBareOrAccessedRequire(node) {
            return isBindingElement(node) && isVariableDeclarationInitializedToBareOrAccessedRequire(node.parent.parent);
        }