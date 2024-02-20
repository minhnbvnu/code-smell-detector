function isBindingOrAssignmentElement(node) {
            return isVariableDeclaration(node) || isParameter(node) || isObjectBindingOrAssignmentElement(node) || isArrayBindingOrAssignmentElement(node);
        }