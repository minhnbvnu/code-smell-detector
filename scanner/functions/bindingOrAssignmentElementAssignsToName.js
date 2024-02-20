function bindingOrAssignmentElementAssignsToName(element, escapedName) {
            const target = getTargetOfBindingOrAssignmentElement(element);
            if (isBindingOrAssignmentPattern(target)) {
                return bindingOrAssignmentPatternAssignsToName(target, escapedName);
            }
            else if (isIdentifier(target)) {
                return target.escapedText === escapedName;
            }
            return false;
        }