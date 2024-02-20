function isEmptyBindingPattern(node) {
            if (isBindingPattern(node)) {
                return every(node.elements, isEmptyBindingElement);
            }
            return false;
        }