function forEachProperty(objectLiteral, cb) {
            if (!isObjectLiteralExpression(objectLiteral))
                return;
            for (const property of objectLiteral.properties) {
                if (isPropertyAssignment(property) && isStringLiteral(property.name)) {
                    cb(property, property.name.text);
                }
            }
        }