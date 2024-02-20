function isTypeArgumentOrParameterOrAssertion(token, parent2) {
            if (token.kind !== 29 /* LessThanToken */ && token.kind !== 31 /* GreaterThanToken */) {
                return false;
            }
            switch (parent2.kind) {
                case 180 /* TypeReference */:
                case 213 /* TypeAssertionExpression */:
                case 262 /* TypeAliasDeclaration */:
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 261 /* InterfaceDeclaration */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 216 /* ArrowFunction */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 176 /* CallSignature */:
                case 177 /* ConstructSignature */:
                case 210 /* CallExpression */:
                case 211 /* NewExpression */:
                case 230 /* ExpressionWithTypeArguments */:
                    return true;
                default:
                    return false;
            }
        }