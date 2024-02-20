function bindingOrAssignmentPatternAssignsToName(pattern, escapedName) {
            const elements = getElementsOfBindingOrAssignmentPattern(pattern);
            for (const element of elements) {
                if (bindingOrAssignmentElementAssignsToName(element, escapedName)) {
                    return true;
                }
            }
            return false;
        }