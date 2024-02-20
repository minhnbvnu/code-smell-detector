function bindingOrAssignmentPatternContainsNonLiteralComputedName(pattern) {
            return !!forEach(getElementsOfBindingOrAssignmentPattern(pattern), bindingOrAssignmentElementContainsNonLiteralComputedName);
        }