function isLeftHandSideExpressionKind(kind) {
            switch (kind) {
                case 208 /* PropertyAccessExpression */:
                case 209 /* ElementAccessExpression */:
                case 211 /* NewExpression */:
                case 210 /* CallExpression */:
                case 281 /* JsxElement */:
                case 282 /* JsxSelfClosingElement */:
                case 285 /* JsxFragment */:
                case 212 /* TaggedTemplateExpression */:
                case 206 /* ArrayLiteralExpression */:
                case 214 /* ParenthesizedExpression */:
                case 207 /* ObjectLiteralExpression */:
                case 228 /* ClassExpression */:
                case 215 /* FunctionExpression */:
                case 79 /* Identifier */:
                case 80 /* PrivateIdentifier */:
                case 13 /* RegularExpressionLiteral */:
                case 8 /* NumericLiteral */:
                case 9 /* BigIntLiteral */:
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 225 /* TemplateExpression */:
                case 95 /* FalseKeyword */:
                case 104 /* NullKeyword */:
                case 108 /* ThisKeyword */:
                case 110 /* TrueKeyword */:
                case 106 /* SuperKeyword */:
                case 232 /* NonNullExpression */:
                case 230 /* ExpressionWithTypeArguments */:
                case 233 /* MetaProperty */:
                case 100 /* ImportKeyword */:
                case 279 /* MissingDeclaration */:
                    return true;
                default:
                    return false;
            }
        }