function createParenthesizerRules(factory2) {
            let binaryLeftOperandParenthesizerCache;
            let binaryRightOperandParenthesizerCache;
            return {
                getParenthesizeLeftSideOfBinaryForOperator,
                getParenthesizeRightSideOfBinaryForOperator,
                parenthesizeLeftSideOfBinary,
                parenthesizeRightSideOfBinary,
                parenthesizeExpressionOfComputedPropertyName,
                parenthesizeConditionOfConditionalExpression,
                parenthesizeBranchOfConditionalExpression,
                parenthesizeExpressionOfExportDefault,
                parenthesizeExpressionOfNew,
                parenthesizeLeftSideOfAccess,
                parenthesizeOperandOfPostfixUnary,
                parenthesizeOperandOfPrefixUnary,
                parenthesizeExpressionsOfCommaDelimitedList,
                parenthesizeExpressionForDisallowedComma,
                parenthesizeExpressionOfExpressionStatement,
                parenthesizeConciseBodyOfArrowFunction,
                parenthesizeCheckTypeOfConditionalType,
                parenthesizeExtendsTypeOfConditionalType,
                parenthesizeConstituentTypesOfUnionType,
                parenthesizeConstituentTypeOfUnionType,
                parenthesizeConstituentTypesOfIntersectionType,
                parenthesizeConstituentTypeOfIntersectionType,
                parenthesizeOperandOfTypeOperator,
                parenthesizeOperandOfReadonlyTypeOperator,
                parenthesizeNonArrayTypeOfPostfixType,
                parenthesizeElementTypesOfTupleType,
                parenthesizeElementTypeOfTupleType,
                parenthesizeTypeOfOptionalType,
                parenthesizeTypeArguments,
                parenthesizeLeadingTypeArgument
            };
            function getParenthesizeLeftSideOfBinaryForOperator(operatorKind) {
                binaryLeftOperandParenthesizerCache || (binaryLeftOperandParenthesizerCache = /* @__PURE__ */ new Map());
                let parenthesizerRule = binaryLeftOperandParenthesizerCache.get(operatorKind);
                if (!parenthesizerRule) {
                    parenthesizerRule = (node) => parenthesizeLeftSideOfBinary(operatorKind, node);
                    binaryLeftOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
                }
                return parenthesizerRule;
            }
            function getParenthesizeRightSideOfBinaryForOperator(operatorKind) {
                binaryRightOperandParenthesizerCache || (binaryRightOperandParenthesizerCache = /* @__PURE__ */ new Map());
                let parenthesizerRule = binaryRightOperandParenthesizerCache.get(operatorKind);
                if (!parenthesizerRule) {
                    parenthesizerRule = (node) => parenthesizeRightSideOfBinary(operatorKind, 
                    /*leftSide*/
                    void 0, node);
                    binaryRightOperandParenthesizerCache.set(operatorKind, parenthesizerRule);
                }
                return parenthesizerRule;
            }
            function binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand) {
                const binaryOperatorPrecedence = getOperatorPrecedence(223 /* BinaryExpression */, binaryOperator);
                const binaryOperatorAssociativity = getOperatorAssociativity(223 /* BinaryExpression */, binaryOperator);
                const emittedOperand = skipPartiallyEmittedExpressions(operand);
                if (!isLeftSideOfBinary && operand.kind === 216 /* ArrowFunction */ && binaryOperatorPrecedence > 3 /* Assignment */) {
                    return true;
                }
                const operandPrecedence = getExpressionPrecedence(emittedOperand);
                switch (compareValues(operandPrecedence, binaryOperatorPrecedence)) {
                    case -1 /* LessThan */:
                        if (!isLeftSideOfBinary && binaryOperatorAssociativity === 1 /* Right */ && operand.kind === 226 /* YieldExpression */) {
                            return false;
                        }
                        return true;
                    case 1 /* GreaterThan */:
                        return false;
                    case 0 /* EqualTo */:
                        if (isLeftSideOfBinary) {
                            return binaryOperatorAssociativity === 1 /* Right */;
                        }
                        else {
                            if (isBinaryExpression(emittedOperand) && emittedOperand.operatorToken.kind === binaryOperator) {
                                if (operatorHasAssociativeProperty(binaryOperator)) {
                                    return false;
                                }
                                if (binaryOperator === 39 /* PlusToken */) {
                                    const leftKind = leftOperand ? getLiteralKindOfBinaryPlusOperand(leftOperand) : 0 /* Unknown */;
                                    if (isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand(emittedOperand)) {
                                        return false;
                                    }
                                }
                            }
                            const operandAssociativity = getExpressionAssociativity(emittedOperand);
                            return operandAssociativity === 0 /* Left */;
                        }
                }
            }
            function operatorHasAssociativeProperty(binaryOperator) {
                return binaryOperator === 41 /* AsteriskToken */ || binaryOperator === 51 /* BarToken */ || binaryOperator === 50 /* AmpersandToken */ || binaryOperator === 52 /* CaretToken */ || binaryOperator === 27 /* CommaToken */;
            }
            function getLiteralKindOfBinaryPlusOperand(node) {
                node = skipPartiallyEmittedExpressions(node);
                if (isLiteralKind(node.kind)) {
                    return node.kind;
                }
                if (node.kind === 223 /* BinaryExpression */ && node.operatorToken.kind === 39 /* PlusToken */) {
                    if (node.cachedLiteralKind !== void 0) {
                        return node.cachedLiteralKind;
                    }
                    const leftKind = getLiteralKindOfBinaryPlusOperand(node.left);
                    const literalKind = isLiteralKind(leftKind) && leftKind === getLiteralKindOfBinaryPlusOperand(node.right) ? leftKind : 0 /* Unknown */;
                    node.cachedLiteralKind = literalKind;
                    return literalKind;
                }
                return 0 /* Unknown */;
            }
            function parenthesizeBinaryOperand(binaryOperator, operand, isLeftSideOfBinary, leftOperand) {
                const skipped = skipPartiallyEmittedExpressions(operand);
                if (skipped.kind === 214 /* ParenthesizedExpression */) {
                    return operand;
                }
                return binaryOperandNeedsParentheses(binaryOperator, operand, isLeftSideOfBinary, leftOperand) ? factory2.createParenthesizedExpression(operand) : operand;
            }
            function parenthesizeLeftSideOfBinary(binaryOperator, leftSide) {
                return parenthesizeBinaryOperand(binaryOperator, leftSide, 
                /*isLeftSideOfBinary*/
                true);
            }
            function parenthesizeRightSideOfBinary(binaryOperator, leftSide, rightSide) {
                return parenthesizeBinaryOperand(binaryOperator, rightSide, 
                /*isLeftSideOfBinary*/
                false, leftSide);
            }
            function parenthesizeExpressionOfComputedPropertyName(expression) {
                return isCommaSequence(expression) ? factory2.createParenthesizedExpression(expression) : expression;
            }
            function parenthesizeConditionOfConditionalExpression(condition) {
                const conditionalPrecedence = getOperatorPrecedence(224 /* ConditionalExpression */, 57 /* QuestionToken */);
                const emittedCondition = skipPartiallyEmittedExpressions(condition);
                const conditionPrecedence = getExpressionPrecedence(emittedCondition);
                if (compareValues(conditionPrecedence, conditionalPrecedence) !== 1 /* GreaterThan */) {
                    return factory2.createParenthesizedExpression(condition);
                }
                return condition;
            }
            function parenthesizeBranchOfConditionalExpression(branch) {
                const emittedExpression = skipPartiallyEmittedExpressions(branch);
                return isCommaSequence(emittedExpression) ? factory2.createParenthesizedExpression(branch) : branch;
            }
            function parenthesizeExpressionOfExportDefault(expression) {
                const check = skipPartiallyEmittedExpressions(expression);
                let needsParens = isCommaSequence(check);
                if (!needsParens) {
                    switch (getLeftmostExpression(check, 
                    /*stopAtCallExpression*/
                    false).kind) {
                        case 228 /* ClassExpression */:
                        case 215 /* FunctionExpression */:
                            needsParens = true;
                    }
                }
                return needsParens ? factory2.createParenthesizedExpression(expression) : expression;
            }
            function parenthesizeExpressionOfNew(expression) {
                const leftmostExpr = getLeftmostExpression(expression, 
                /*stopAtCallExpressions*/
                true);
                switch (leftmostExpr.kind) {
                    case 210 /* CallExpression */:
                        return factory2.createParenthesizedExpression(expression);
                    case 211 /* NewExpression */:
                        return !leftmostExpr.arguments ? factory2.createParenthesizedExpression(expression) : expression;
                }
                return parenthesizeLeftSideOfAccess(expression);
            }
            function parenthesizeLeftSideOfAccess(expression, optionalChain) {
                const emittedExpression = skipPartiallyEmittedExpressions(expression);
                if (isLeftHandSideExpression(emittedExpression) && (emittedExpression.kind !== 211 /* NewExpression */ || emittedExpression.arguments) && (optionalChain || !isOptionalChain(emittedExpression))) {
                    return expression;
                }
                return setTextRange(factory2.createParenthesizedExpression(expression), expression);
            }
            function parenthesizeOperandOfPostfixUnary(operand) {
                return isLeftHandSideExpression(operand) ? operand : setTextRange(factory2.createParenthesizedExpression(operand), operand);
            }
            function parenthesizeOperandOfPrefixUnary(operand) {
                return isUnaryExpression(operand) ? operand : setTextRange(factory2.createParenthesizedExpression(operand), operand);
            }
            function parenthesizeExpressionsOfCommaDelimitedList(elements) {
                const result = sameMap(elements, parenthesizeExpressionForDisallowedComma);
                return setTextRange(factory2.createNodeArray(result, elements.hasTrailingComma), elements);
            }
            function parenthesizeExpressionForDisallowedComma(expression) {
                const emittedExpression = skipPartiallyEmittedExpressions(expression);
                const expressionPrecedence = getExpressionPrecedence(emittedExpression);
                const commaPrecedence = getOperatorPrecedence(223 /* BinaryExpression */, 27 /* CommaToken */);
                return expressionPrecedence > commaPrecedence ? expression : setTextRange(factory2.createParenthesizedExpression(expression), expression);
            }
            function parenthesizeExpressionOfExpressionStatement(expression) {
                const emittedExpression = skipPartiallyEmittedExpressions(expression);
                if (isCallExpression(emittedExpression)) {
                    const callee = emittedExpression.expression;
                    const kind = skipPartiallyEmittedExpressions(callee).kind;
                    if (kind === 215 /* FunctionExpression */ || kind === 216 /* ArrowFunction */) {
                        const updated = factory2.updateCallExpression(emittedExpression, setTextRange(factory2.createParenthesizedExpression(callee), callee), emittedExpression.typeArguments, emittedExpression.arguments);
                        return factory2.restoreOuterExpressions(expression, updated, 8 /* PartiallyEmittedExpressions */);
                    }
                }
                const leftmostExpressionKind = getLeftmostExpression(emittedExpression, 
                /*stopAtCallExpressions*/
                false).kind;
                if (leftmostExpressionKind === 207 /* ObjectLiteralExpression */ || leftmostExpressionKind === 215 /* FunctionExpression */) {
                    return setTextRange(factory2.createParenthesizedExpression(expression), expression);
                }
                return expression;
            }
            function parenthesizeConciseBodyOfArrowFunction(body) {
                if (!isBlock(body) && (isCommaSequence(body) || getLeftmostExpression(body, 
                /*stopAtCallExpressions*/
                false).kind === 207 /* ObjectLiteralExpression */)) {
                    return setTextRange(factory2.createParenthesizedExpression(body), body);
                }
                return body;
            }
            function parenthesizeCheckTypeOfConditionalType(checkType) {
                switch (checkType.kind) {
                    case 181 /* FunctionType */:
                    case 182 /* ConstructorType */:
                    case 191 /* ConditionalType */:
                        return factory2.createParenthesizedType(checkType);
                }
                return checkType;
            }
            function parenthesizeExtendsTypeOfConditionalType(extendsType) {
                switch (extendsType.kind) {
                    case 191 /* ConditionalType */:
                        return factory2.createParenthesizedType(extendsType);
                }
                return extendsType;
            }
            function parenthesizeConstituentTypeOfUnionType(type) {
                switch (type.kind) {
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeCheckTypeOfConditionalType(type);
            }
            function parenthesizeConstituentTypesOfUnionType(members) {
                return factory2.createNodeArray(sameMap(members, parenthesizeConstituentTypeOfUnionType));
            }
            function parenthesizeConstituentTypeOfIntersectionType(type) {
                switch (type.kind) {
                    case 189 /* UnionType */:
                    case 190 /* IntersectionType */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeConstituentTypeOfUnionType(type);
            }
            function parenthesizeConstituentTypesOfIntersectionType(members) {
                return factory2.createNodeArray(sameMap(members, parenthesizeConstituentTypeOfIntersectionType));
            }
            function parenthesizeOperandOfTypeOperator(type) {
                switch (type.kind) {
                    case 190 /* IntersectionType */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeConstituentTypeOfIntersectionType(type);
            }
            function parenthesizeOperandOfReadonlyTypeOperator(type) {
                switch (type.kind) {
                    case 195 /* TypeOperator */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeOperandOfTypeOperator(type);
            }
            function parenthesizeNonArrayTypeOfPostfixType(type) {
                switch (type.kind) {
                    case 192 /* InferType */:
                    case 195 /* TypeOperator */:
                    case 183 /* TypeQuery */:
                        return factory2.createParenthesizedType(type);
                }
                return parenthesizeOperandOfTypeOperator(type);
            }
            function parenthesizeElementTypesOfTupleType(types) {
                return factory2.createNodeArray(sameMap(types, parenthesizeElementTypeOfTupleType));
            }
            function parenthesizeElementTypeOfTupleType(type) {
                if (hasJSDocPostfixQuestion(type))
                    return factory2.createParenthesizedType(type);
                return type;
            }
            function hasJSDocPostfixQuestion(type) {
                if (isJSDocNullableType(type))
                    return type.postfix;
                if (isNamedTupleMember(type))
                    return hasJSDocPostfixQuestion(type.type);
                if (isFunctionTypeNode(type) || isConstructorTypeNode(type) || isTypeOperatorNode(type))
                    return hasJSDocPostfixQuestion(type.type);
                if (isConditionalTypeNode(type))
                    return hasJSDocPostfixQuestion(type.falseType);
                if (isUnionTypeNode(type))
                    return hasJSDocPostfixQuestion(last(type.types));
                if (isIntersectionTypeNode(type))
                    return hasJSDocPostfixQuestion(last(type.types));
                if (isInferTypeNode(type))
                    return !!type.typeParameter.constraint && hasJSDocPostfixQuestion(type.typeParameter.constraint);
                return false;
            }
            function parenthesizeTypeOfOptionalType(type) {
                if (hasJSDocPostfixQuestion(type))
                    return factory2.createParenthesizedType(type);
                return parenthesizeNonArrayTypeOfPostfixType(type);
            }
            function parenthesizeLeadingTypeArgument(node) {
                return isFunctionOrConstructorTypeNode(node) && node.typeParameters ? factory2.createParenthesizedType(node) : node;
            }
            function parenthesizeOrdinalTypeArgument(node, i) {
                return i === 0 ? parenthesizeLeadingTypeArgument(node) : node;
            }
            function parenthesizeTypeArguments(typeArguments) {
                if (some(typeArguments)) {
                    return factory2.createNodeArray(sameMap(typeArguments, parenthesizeOrdinalTypeArgument));
                }
            }
        }