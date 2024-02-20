function tryAddPropertyAssignment(properties, propertyName, expression) {
                if (expression) {
                    properties.push(createPropertyAssignment(propertyName, expression));
                    return true;
                }
                return false;
            }