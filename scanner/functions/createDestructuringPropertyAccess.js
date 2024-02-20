function createDestructuringPropertyAccess(flattenContext, value, propertyName) {
            if (isComputedPropertyName(propertyName)) {
                const argumentExpression = ensureIdentifier(flattenContext, Debug.checkDefined(visitNode(propertyName.expression, flattenContext.visitor, isExpression)), 
                /*reuseIdentifierExpressions*/
                false, 
                /*location*/
                propertyName);
                return flattenContext.context.factory.createElementAccessExpression(value, argumentExpression);
            }
            else if (isStringOrNumericLiteralLike(propertyName)) {
                const argumentExpression = factory.cloneNode(propertyName);
                return flattenContext.context.factory.createElementAccessExpression(value, argumentExpression);
            }
            else {
                const name = flattenContext.context.factory.createIdentifier(idText(propertyName));
                return flattenContext.context.factory.createPropertyAccessExpression(value, name);
            }
        }