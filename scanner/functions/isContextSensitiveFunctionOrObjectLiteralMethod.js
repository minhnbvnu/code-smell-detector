function isContextSensitiveFunctionOrObjectLiteralMethod(func) {
                return (isFunctionExpressionOrArrowFunction(func) || isObjectLiteralMethod(func)) && isContextSensitiveFunctionLikeDeclaration(func);
            }