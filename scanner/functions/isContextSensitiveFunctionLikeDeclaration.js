function isContextSensitiveFunctionLikeDeclaration(node) {
                return hasContextSensitiveParameters(node) || hasContextSensitiveReturnExpression(node);
            }