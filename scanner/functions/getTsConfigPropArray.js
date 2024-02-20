function getTsConfigPropArray(tsConfigSourceFile, propKey) {
            const jsonObjectLiteral = getTsConfigObjectLiteralExpression(tsConfigSourceFile);
            return jsonObjectLiteral ? getPropertyAssignment(jsonObjectLiteral, propKey) : emptyArray;
        }