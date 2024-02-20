function getAccessedPropertyName(access) {
                if (isPropertyAccessExpression(access)) {
                    return access.name.escapedText;
                }
                if (isElementAccessExpression(access)) {
                    return tryGetElementAccessExpressionName(access);
                }
                if (isBindingElement(access)) {
                    const name = getDestructuringPropertyName(access);
                    return name ? escapeLeadingUnderscores(name) : void 0;
                }
                if (isParameter(access)) {
                    return "" + access.parent.parameters.indexOf(access);
                }
                return void 0;
            }