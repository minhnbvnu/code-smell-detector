function isEmptyBindingElement(node) {
            if (isOmittedExpression(node)) {
                return true;
            }
            return isEmptyBindingPattern(node.name);
        }