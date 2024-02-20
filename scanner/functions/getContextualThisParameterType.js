function getContextualThisParameterType(func) {
                if (func.kind === 216 /* ArrowFunction */) {
                    return void 0;
                }
                if (isContextSensitiveFunctionOrObjectLiteralMethod(func)) {
                    const contextualSignature = getContextualSignature(func);
                    if (contextualSignature) {
                        const thisParameter = contextualSignature.thisParameter;
                        if (thisParameter) {
                            return getTypeOfSymbol(thisParameter);
                        }
                    }
                }
                const inJs = isInJSFile(func);
                if (noImplicitThis || inJs) {
                    const containingLiteral = getContainingObjectLiteral(func);
                    if (containingLiteral) {
                        const contextualType = getApparentTypeOfContextualType(containingLiteral, 
                        /*contextFlags*/
                        void 0);
                        let literal = containingLiteral;
                        let type = contextualType;
                        while (type) {
                            const thisType = getThisTypeFromContextualType(type);
                            if (thisType) {
                                return instantiateType(thisType, getMapperFromContext(getInferenceContext(containingLiteral)));
                            }
                            if (literal.parent.kind !== 299 /* PropertyAssignment */) {
                                break;
                            }
                            literal = literal.parent.parent;
                            type = getApparentTypeOfContextualType(literal, 
                            /*contextFlags*/
                            void 0);
                        }
                        return getWidenedType(contextualType ? getNonNullableType(contextualType) : checkExpressionCached(containingLiteral));
                    }
                    const parent2 = walkUpParenthesizedExpressions(func.parent);
                    if (parent2.kind === 223 /* BinaryExpression */ && parent2.operatorToken.kind === 63 /* EqualsToken */) {
                        const target = parent2.left;
                        if (isAccessExpression(target)) {
                            const { expression } = target;
                            if (inJs && isIdentifier(expression)) {
                                const sourceFile = getSourceFileOfNode(parent2);
                                if (sourceFile.commonJsModuleIndicator && getResolvedSymbol(expression) === sourceFile.symbol) {
                                    return void 0;
                                }
                            }
                            return getWidenedType(checkExpressionCached(expression));
                        }
                    }
                }
                return void 0;
            }