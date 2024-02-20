function isBindingOrAssignmentPattern(node) {
            return isObjectBindingOrAssignmentPattern(node) || isArrayBindingOrAssignmentPattern(node);
        }