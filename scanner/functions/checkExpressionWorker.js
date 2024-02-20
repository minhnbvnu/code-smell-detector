function checkExpressionWorker(node, checkMode, forceTuple) {
                const kind = node.kind;
                if (cancellationToken) {
                    switch (kind) {
                        case 228 /* ClassExpression */:
                        case 215 /* FunctionExpression */:
                        case 216 /* ArrowFunction */:
                            cancellationToken.throwIfCancellationRequested();
                    }
                }
                switch (kind) {
                    case 79 /* Identifier */:
                        return checkIdentifier(node, checkMode);
                    case 80 /* PrivateIdentifier */:
                        return checkPrivateIdentifierExpression(node);
                    case 108 /* ThisKeyword */:
                        return checkThisExpression(node);
                    case 106 /* SuperKeyword */:
                        return checkSuperExpression(node);
                    case 104 /* NullKeyword */:
                        return nullWideningType;
                    case 14 /* NoSubstitutionTemplateLiteral */:
                    case 10 /* StringLiteral */:
                        return getFreshTypeOfLiteralType(getStringLiteralType(node.text));
                    case 8 /* NumericLiteral */:
                        checkGrammarNumericLiteral(node);
                        return getFreshTypeOfLiteralType(getNumberLiteralType(+node.text));
                    case 9 /* BigIntLiteral */:
                        checkGrammarBigIntLiteral(node);
                        return getFreshTypeOfLiteralType(getBigIntLiteralType({
                            negative: false,
                            base10Value: parsePseudoBigInt(node.text)
                        }));
                    case 110 /* TrueKeyword */:
                        return trueType;
                    case 95 /* FalseKeyword */:
                        return falseType;
                    case 225 /* TemplateExpression */:
                        return checkTemplateExpression(node);
                    case 13 /* RegularExpressionLiteral */:
                        return globalRegExpType;
                    case 206 /* ArrayLiteralExpression */:
                        return checkArrayLiteral(node, checkMode, forceTuple);
                    case 207 /* ObjectLiteralExpression */:
                        return checkObjectLiteral(node, checkMode);
                    case 208 /* PropertyAccessExpression */:
                        return checkPropertyAccessExpression(node, checkMode);
                    case 163 /* QualifiedName */:
                        return checkQualifiedName(node, checkMode);
                    case 209 /* ElementAccessExpression */:
                        return checkIndexedAccess(node, checkMode);
                    case 210 /* CallExpression */:
                        if (node.expression.kind === 100 /* ImportKeyword */) {
                            return checkImportCallExpression(node);
                        }
                    case 211 /* NewExpression */:
                        return checkCallExpression(node, checkMode);
                    case 212 /* TaggedTemplateExpression */:
                        return checkTaggedTemplateExpression(node);
                    case 214 /* ParenthesizedExpression */:
                        return checkParenthesizedExpression(node, checkMode);
                    case 228 /* ClassExpression */:
                        return checkClassExpression(node);
                    case 215 /* FunctionExpression */:
                    case 216 /* ArrowFunction */:
                        return checkFunctionExpressionOrObjectLiteralMethod(node, checkMode);
                    case 218 /* TypeOfExpression */:
                        return checkTypeOfExpression(node);
                    case 213 /* TypeAssertionExpression */:
                    case 231 /* AsExpression */:
                        return checkAssertion(node);
                    case 232 /* NonNullExpression */:
                        return checkNonNullAssertion(node);
                    case 230 /* ExpressionWithTypeArguments */:
                        return checkExpressionWithTypeArguments(node);
                    case 235 /* SatisfiesExpression */:
                        return checkSatisfiesExpression(node);
                    case 233 /* MetaProperty */:
                        return checkMetaProperty(node);
                    case 217 /* DeleteExpression */:
                        return checkDeleteExpression(node);
                    case 219 /* VoidExpression */:
                        return checkVoidExpression(node);
                    case 220 /* AwaitExpression */:
                        return checkAwaitExpression(node);
                    case 221 /* PrefixUnaryExpression */:
                        return checkPrefixUnaryExpression(node);
                    case 222 /* PostfixUnaryExpression */:
                        return checkPostfixUnaryExpression(node);
                    case 223 /* BinaryExpression */:
                        return checkBinaryExpression(node, checkMode);
                    case 224 /* ConditionalExpression */:
                        return checkConditionalExpression(node, checkMode);
                    case 227 /* SpreadElement */:
                        return checkSpreadExpression(node, checkMode);
                    case 229 /* OmittedExpression */:
                        return undefinedWideningType;
                    case 226 /* YieldExpression */:
                        return checkYieldExpression(node);
                    case 234 /* SyntheticExpression */:
                        return checkSyntheticExpression(node);
                    case 291 /* JsxExpression */:
                        return checkJsxExpression(node, checkMode);
                    case 281 /* JsxElement */:
                        return checkJsxElement(node, checkMode);
                    case 282 /* JsxSelfClosingElement */:
                        return checkJsxSelfClosingElement(node, checkMode);
                    case 285 /* JsxFragment */:
                        return checkJsxFragment(node);
                    case 289 /* JsxAttributes */:
                        return checkJsxAttributes(node, checkMode);
                    case 283 /* JsxOpeningElement */:
                        Debug.fail("Shouldn't ever directly check a JsxOpeningElement");
                }
                return errorType;
            }