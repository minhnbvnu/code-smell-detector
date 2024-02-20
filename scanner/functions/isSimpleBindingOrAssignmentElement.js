function isSimpleBindingOrAssignmentElement(element) {
            const target = getTargetOfBindingOrAssignmentElement(element);
            if (!target || isOmittedExpression(target))
                return true;
            const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(element);
            if (propertyName && !isPropertyNameLiteral(propertyName))
                return false;
            const initializer = getInitializerOfBindingOrAssignmentElement(element);
            if (initializer && !isSimpleInlineableExpression(initializer))
                return false;
            if (isBindingOrAssignmentPattern(target))
                return every(getElementsOfBindingOrAssignmentPattern(target), isSimpleBindingOrAssignmentElement);
            return isIdentifier(target);
        }