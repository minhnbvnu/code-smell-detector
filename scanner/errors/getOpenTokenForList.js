function getOpenTokenForList(node, list) {
            switch (node.kind) {
                case 173 /* Constructor */:
                case 259 /* FunctionDeclaration */:
                case 215 /* FunctionExpression */:
                case 171 /* MethodDeclaration */:
                case 170 /* MethodSignature */:
                case 216 /* ArrowFunction */:
                case 176 /* CallSignature */:
                case 177 /* ConstructSignature */:
                case 181 /* FunctionType */:
                case 182 /* ConstructorType */:
                case 174 /* GetAccessor */:
                case 175 /* SetAccessor */:
                    if (node.typeParameters === list) {
                        return 29 /* LessThanToken */;
                    }
                    else if (node.parameters === list) {
                        return 20 /* OpenParenToken */;
                    }
                    break;
                case 210 /* CallExpression */:
                case 211 /* NewExpression */:
                    if (node.typeArguments === list) {
                        return 29 /* LessThanToken */;
                    }
                    else if (node.arguments === list) {
                        return 20 /* OpenParenToken */;
                    }
                    break;
                case 260 /* ClassDeclaration */:
                case 228 /* ClassExpression */:
                case 261 /* InterfaceDeclaration */:
                case 262 /* TypeAliasDeclaration */:
                    if (node.typeParameters === list) {
                        return 29 /* LessThanToken */;
                    }
                    break;
                case 180 /* TypeReference */:
                case 212 /* TaggedTemplateExpression */:
                case 183 /* TypeQuery */:
                case 230 /* ExpressionWithTypeArguments */:
                case 202 /* ImportType */:
                    if (node.typeArguments === list) {
                        return 29 /* LessThanToken */;
                    }
                    break;
                case 184 /* TypeLiteral */:
                    return 18 /* OpenBraceToken */;
            }
            return 0 /* Unknown */;
        }