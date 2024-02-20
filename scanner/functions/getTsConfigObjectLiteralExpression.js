function getTsConfigObjectLiteralExpression(tsConfigSourceFile) {
            if (tsConfigSourceFile && tsConfigSourceFile.statements.length) {
                const expression = tsConfigSourceFile.statements[0].expression;
                return tryCast(expression, isObjectLiteralExpression);
            }
        }