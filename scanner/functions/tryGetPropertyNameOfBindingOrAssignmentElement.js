function tryGetPropertyNameOfBindingOrAssignmentElement(bindingElement) {
            switch (bindingElement.kind) {
                case 205 /* BindingElement */:
                    if (bindingElement.propertyName) {
                        const propertyName = bindingElement.propertyName;
                        if (isPrivateIdentifier(propertyName)) {
                            return Debug.failBadSyntaxKind(propertyName);
                        }
                        return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression) ? propertyName.expression : propertyName;
                    }
                    break;
                case 299 /* PropertyAssignment */:
                    if (bindingElement.name) {
                        const propertyName = bindingElement.name;
                        if (isPrivateIdentifier(propertyName)) {
                            return Debug.failBadSyntaxKind(propertyName);
                        }
                        return isComputedPropertyName(propertyName) && isStringOrNumericLiteral(propertyName.expression) ? propertyName.expression : propertyName;
                    }
                    break;
                case 301 /* SpreadAssignment */:
                    if (bindingElement.name && isPrivateIdentifier(bindingElement.name)) {
                        return Debug.failBadSyntaxKind(bindingElement.name);
                    }
                    return bindingElement.name;
            }
            const target = getTargetOfBindingOrAssignmentElement(bindingElement);
            if (target && isPropertyName(target)) {
                return target;
            }
        }