function isObjectBindingElementWithoutPropertyName(bindingElement) {
            return isBindingElement(bindingElement) && isObjectBindingPattern(bindingElement.parent) && isIdentifier(bindingElement.name) && !bindingElement.propertyName;
        }