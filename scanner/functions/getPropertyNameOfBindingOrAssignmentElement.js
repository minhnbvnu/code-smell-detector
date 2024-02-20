function getPropertyNameOfBindingOrAssignmentElement(bindingElement) {
            const propertyName = tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement);
            Debug.assert(!!propertyName || isSpreadAssignment(bindingElement), "Invalid property name for binding element.");
            return propertyName;
        }