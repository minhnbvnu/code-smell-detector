function getPropertyArrayElementValue(objectLiteral, propKey, elementValue) {
            return firstDefined(getPropertyAssignment(objectLiteral, propKey), (property) => isArrayLiteralExpression(property.initializer) ? find(property.initializer.elements, (element) => isStringLiteral(element) && element.text === elementValue) : void 0);
        }