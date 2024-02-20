function getTsConfigPropArrayElementValue(tsConfigSourceFile, propKey, elementValue) {
            return firstDefined(getTsConfigPropArray(tsConfigSourceFile, propKey), (property) => isArrayLiteralExpression(property.initializer) ? find(property.initializer.elements, (element) => isStringLiteral(element) && element.text === elementValue) : void 0);
        }