function bindingOrAssignmentElementContainsNonLiteralComputedName(element) {
            const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(element);
            if (propertyName && isComputedPropertyName(propertyName) && !isLiteralExpression(propertyName.expression)) {
                return true;
            }
            const target = getTargetOfBindingOrAssignmentElement(element);
            return !!target && isBindingOrAssignmentPattern(target) && bindingOrAssignmentPatternContainsNonLiteralComputedName(target);
        }