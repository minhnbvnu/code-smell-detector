function isExpressionNode(node) {
            switch (node.kind) {
                case 106 /* SuperKeyword */:
                case 104 /* NullKeyword */:
                case 110 /* TrueKeyword */:
                case 95 /* FalseKeyword */:
                case 13 /* RegularExpressionLiteral */:
                case 206 /* ArrayLiteralExpression */:
                case 207 /* ObjectLiteralExpression */:
                case 208 /* PropertyAccessExpression */:
                case 209 /* ElementAccessExpression */:
                case 210 /* CallExpression */:
                case 211 /* NewExpression */:
                case 212 /* TaggedTemplateExpression */:
                case 231 /* AsExpression */:
                case 213 /* TypeAssertionExpression */:
                case 235 /* SatisfiesExpression */:
                case 232 /* NonNullExpression */:
                case 214 /* ParenthesizedExpression */:
                case 215 /* FunctionExpression */:
                case 228 /* ClassExpression */:
                case 216 /* ArrowFunction */:
                case 219 /* VoidExpression */:
                case 217 /* DeleteExpression */:
                case 218 /* TypeOfExpression */:
                case 221 /* PrefixUnaryExpression */:
                case 222 /* PostfixUnaryExpression */:
                case 223 /* BinaryExpression */:
                case 224 /* ConditionalExpression */:
                case 227 /* SpreadElement */:
                case 225 /* TemplateExpression */:
                case 229 /* OmittedExpression */:
                case 281 /* JsxElement */:
                case 282 /* JsxSelfClosingElement */:
                case 285 /* JsxFragment */:
                case 226 /* YieldExpression */:
                case 220 /* AwaitExpression */:
                case 233 /* MetaProperty */:
                    return true;
                case 230 /* ExpressionWithTypeArguments */:
                    return !isHeritageClause(node.parent) && !isJSDocAugmentsTag(node.parent);
                case 163 /* QualifiedName */:
                    while (node.parent.kind === 163 /* QualifiedName */) {
                        node = node.parent;
                    }
                    return node.parent.kind === 183 /* TypeQuery */ || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
                case 314 /* JSDocMemberName */:
                    while (isJSDocMemberName(node.parent)) {
                        node = node.parent;
                    }
                    return node.parent.kind === 183 /* TypeQuery */ || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
                case 80 /* PrivateIdentifier */:
                    return isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === 101 /* InKeyword */;
                case 79 /* Identifier */:
                    if (node.parent.kind === 183 /* TypeQuery */ || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node)) {
                        return true;
                    }
                case 8 /* NumericLiteral */:
                case 9 /* BigIntLiteral */:
                case 10 /* StringLiteral */:
                case 14 /* NoSubstitutionTemplateLiteral */:
                case 108 /* ThisKeyword */:
                    return isInExpressionContext(node);
                default:
                    return false;
            }
        }