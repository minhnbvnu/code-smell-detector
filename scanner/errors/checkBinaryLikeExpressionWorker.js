function checkBinaryLikeExpressionWorker(left, operatorToken, right, leftType, rightType, errorNode) {
                const operator = operatorToken.kind;
                switch (operator) {
                    case 41 /* AsteriskToken */:
                    case 42 /* AsteriskAsteriskToken */:
                    case 66 /* AsteriskEqualsToken */:
                    case 67 /* AsteriskAsteriskEqualsToken */:
                    case 43 /* SlashToken */:
                    case 68 /* SlashEqualsToken */:
                    case 44 /* PercentToken */:
                    case 69 /* PercentEqualsToken */:
                    case 40 /* MinusToken */:
                    case 65 /* MinusEqualsToken */:
                    case 47 /* LessThanLessThanToken */:
                    case 70 /* LessThanLessThanEqualsToken */:
                    case 48 /* GreaterThanGreaterThanToken */:
                    case 71 /* GreaterThanGreaterThanEqualsToken */:
                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    case 51 /* BarToken */:
                    case 74 /* BarEqualsToken */:
                    case 52 /* CaretToken */:
                    case 78 /* CaretEqualsToken */:
                    case 50 /* AmpersandToken */:
                    case 73 /* AmpersandEqualsToken */:
                        if (leftType === silentNeverType || rightType === silentNeverType) {
                            return silentNeverType;
                        }
                        leftType = checkNonNullType(leftType, left);
                        rightType = checkNonNullType(rightType, right);
                        let suggestedOperator;
                        if (leftType.flags & 528 /* BooleanLike */ && rightType.flags & 528 /* BooleanLike */ && (suggestedOperator = getSuggestedBooleanOperator(operatorToken.kind)) !== void 0) {
                            error(errorNode || operatorToken, Diagnostics.The_0_operator_is_not_allowed_for_boolean_types_Consider_using_1_instead, tokenToString(operatorToken.kind), tokenToString(suggestedOperator));
                            return numberType;
                        }
                        else {
                            const leftOk = checkArithmeticOperandType(left, leftType, Diagnostics.The_left_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type, 
                            /*isAwaitValid*/
                            true);
                            const rightOk = checkArithmeticOperandType(right, rightType, Diagnostics.The_right_hand_side_of_an_arithmetic_operation_must_be_of_type_any_number_bigint_or_an_enum_type, 
                            /*isAwaitValid*/
                            true);
                            let resultType2;
                            if (isTypeAssignableToKind(leftType, 3 /* AnyOrUnknown */) && isTypeAssignableToKind(rightType, 3 /* AnyOrUnknown */) || // Or, if neither could be bigint, implicit coercion results in a number result
                                !(maybeTypeOfKind(leftType, 2112 /* BigIntLike */) || maybeTypeOfKind(rightType, 2112 /* BigIntLike */))) {
                                resultType2 = numberType;
                            }
                            else if (bothAreBigIntLike(leftType, rightType)) {
                                switch (operator) {
                                    case 49 /* GreaterThanGreaterThanGreaterThanToken */:
                                    case 72 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                                        reportOperatorError();
                                        break;
                                    case 42 /* AsteriskAsteriskToken */:
                                    case 67 /* AsteriskAsteriskEqualsToken */:
                                        if (languageVersion < 3 /* ES2016 */) {
                                            error(errorNode, Diagnostics.Exponentiation_cannot_be_performed_on_bigint_values_unless_the_target_option_is_set_to_es2016_or_later);
                                        }
                                }
                                resultType2 = bigintType;
                            }
                            else {
                                reportOperatorError(bothAreBigIntLike);
                                resultType2 = errorType;
                            }
                            if (leftOk && rightOk) {
                                checkAssignmentOperator(resultType2);
                            }
                            return resultType2;
                        }
                    case 39 /* PlusToken */:
                    case 64 /* PlusEqualsToken */:
                        if (leftType === silentNeverType || rightType === silentNeverType) {
                            return silentNeverType;
                        }
                        if (!isTypeAssignableToKind(leftType, 402653316 /* StringLike */) && !isTypeAssignableToKind(rightType, 402653316 /* StringLike */)) {
                            leftType = checkNonNullType(leftType, left);
                            rightType = checkNonNullType(rightType, right);
                        }
                        let resultType;
                        if (isTypeAssignableToKind(leftType, 296 /* NumberLike */, 
                        /*strict*/
                        true) && isTypeAssignableToKind(rightType, 296 /* NumberLike */, 
                        /*strict*/
                        true)) {
                            resultType = numberType;
                        }
                        else if (isTypeAssignableToKind(leftType, 2112 /* BigIntLike */, 
                        /*strict*/
                        true) && isTypeAssignableToKind(rightType, 2112 /* BigIntLike */, 
                        /*strict*/
                        true)) {
                            resultType = bigintType;
                        }
                        else if (isTypeAssignableToKind(leftType, 402653316 /* StringLike */, 
                        /*strict*/
                        true) || isTypeAssignableToKind(rightType, 402653316 /* StringLike */, 
                        /*strict*/
                        true)) {
                            resultType = stringType;
                        }
                        else if (isTypeAny(leftType) || isTypeAny(rightType)) {
                            resultType = isErrorType(leftType) || isErrorType(rightType) ? errorType : anyType;
                        }
                        if (resultType && !checkForDisallowedESSymbolOperand(operator)) {
                            return resultType;
                        }
                        if (!resultType) {
                            const closeEnoughKind = 296 /* NumberLike */ | 2112 /* BigIntLike */ | 402653316 /* StringLike */ | 3 /* AnyOrUnknown */;
                            reportOperatorError((left2, right2) => isTypeAssignableToKind(left2, closeEnoughKind) && isTypeAssignableToKind(right2, closeEnoughKind));
                            return anyType;
                        }
                        if (operator === 64 /* PlusEqualsToken */) {
                            checkAssignmentOperator(resultType);
                        }
                        return resultType;
                    case 29 /* LessThanToken */:
                    case 31 /* GreaterThanToken */:
                    case 32 /* LessThanEqualsToken */:
                    case 33 /* GreaterThanEqualsToken */:
                        if (checkForDisallowedESSymbolOperand(operator)) {
                            leftType = getBaseTypeOfLiteralTypeForComparison(checkNonNullType(leftType, left));
                            rightType = getBaseTypeOfLiteralTypeForComparison(checkNonNullType(rightType, right));
                            reportOperatorErrorUnless((left2, right2) => {
                                if (isTypeAny(left2) || isTypeAny(right2)) {
                                    return true;
                                }
                                const leftAssignableToNumber = isTypeAssignableTo(left2, numberOrBigIntType);
                                const rightAssignableToNumber = isTypeAssignableTo(right2, numberOrBigIntType);
                                return leftAssignableToNumber && rightAssignableToNumber || !leftAssignableToNumber && !rightAssignableToNumber && areTypesComparable(left2, right2);
                            });
                        }
                        return booleanType;
                    case 34 /* EqualsEqualsToken */:
                    case 35 /* ExclamationEqualsToken */:
                    case 36 /* EqualsEqualsEqualsToken */:
                    case 37 /* ExclamationEqualsEqualsToken */:
                        if (isLiteralExpressionOfObject(left) || isLiteralExpressionOfObject(right)) {
                            const eqType = operator === 34 /* EqualsEqualsToken */ || operator === 36 /* EqualsEqualsEqualsToken */;
                            error(errorNode, Diagnostics.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value, eqType ? "false" : "true");
                        }
                        checkNaNEquality(errorNode, operator, left, right);
                        reportOperatorErrorUnless((left2, right2) => isTypeEqualityComparableTo(left2, right2) || isTypeEqualityComparableTo(right2, left2));
                        return booleanType;
                    case 102 /* InstanceOfKeyword */:
                        return checkInstanceOfExpression(left, right, leftType, rightType);
                    case 101 /* InKeyword */:
                        return checkInExpression(left, right, leftType, rightType);
                    case 55 /* AmpersandAmpersandToken */:
                    case 76 /* AmpersandAmpersandEqualsToken */: {
                        const resultType2 = getTypeFacts(leftType) & 4194304 /* Truthy */ ? getUnionType([extractDefinitelyFalsyTypes(strictNullChecks ? leftType : getBaseTypeOfLiteralType(rightType)), rightType]) : leftType;
                        if (operator === 76 /* AmpersandAmpersandEqualsToken */) {
                            checkAssignmentOperator(rightType);
                        }
                        return resultType2;
                    }
                    case 56 /* BarBarToken */:
                    case 75 /* BarBarEqualsToken */: {
                        const resultType2 = getTypeFacts(leftType) & 8388608 /* Falsy */ ? getUnionType([getNonNullableType(removeDefinitelyFalsyTypes(leftType)), rightType], 2 /* Subtype */) : leftType;
                        if (operator === 75 /* BarBarEqualsToken */) {
                            checkAssignmentOperator(rightType);
                        }
                        return resultType2;
                    }
                    case 60 /* QuestionQuestionToken */:
                    case 77 /* QuestionQuestionEqualsToken */: {
                        const resultType2 = getTypeFacts(leftType) & 262144 /* EQUndefinedOrNull */ ? getUnionType([getNonNullableType(leftType), rightType], 2 /* Subtype */) : leftType;
                        if (operator === 77 /* QuestionQuestionEqualsToken */) {
                            checkAssignmentOperator(rightType);
                        }
                        return resultType2;
                    }
                    case 63 /* EqualsToken */:
                        const declKind = isBinaryExpression(left.parent) ? getAssignmentDeclarationKind(left.parent) : 0 /* None */;
                        checkAssignmentDeclaration(declKind, rightType);
                        if (isAssignmentDeclaration2(declKind)) {
                            if (!(rightType.flags & 524288 /* Object */) || declKind !== 2 /* ModuleExports */ && declKind !== 6 /* Prototype */ && !isEmptyObjectType(rightType) && !isFunctionObjectType(rightType) && !(getObjectFlags(rightType) & 1 /* Class */)) {
                                checkAssignmentOperator(rightType);
                            }
                            return leftType;
                        }
                        else {
                            checkAssignmentOperator(rightType);
                            return rightType;
                        }
                    case 27 /* CommaToken */:
                        if (!compilerOptions.allowUnreachableCode && isSideEffectFree(left) && !isIndirectCall(left.parent)) {
                            const sf = getSourceFileOfNode(left);
                            const sourceText = sf.text;
                            const start = skipTrivia(sourceText, left.pos);
                            const isInDiag2657 = sf.parseDiagnostics.some((diag2) => {
                                if (diag2.code !== Diagnostics.JSX_expressions_must_have_one_parent_element.code)
                                    return false;
                                return textSpanContainsPosition(diag2, start);
                            });
                            if (!isInDiag2657)
                                error(left, Diagnostics.Left_side_of_comma_operator_is_unused_and_has_no_side_effects);
                        }
                        return rightType;
                    default:
                        return Debug.fail();
                }
                function bothAreBigIntLike(left2, right2) {
                    return isTypeAssignableToKind(left2, 2112 /* BigIntLike */) && isTypeAssignableToKind(right2, 2112 /* BigIntLike */);
                }
                function checkAssignmentDeclaration(kind, rightType2) {
                    if (kind === 2 /* ModuleExports */) {
                        for (const prop of getPropertiesOfObjectType(rightType2)) {
                            const propType = getTypeOfSymbol(prop);
                            if (propType.symbol && propType.symbol.flags & 32 /* Class */) {
                                const name = prop.escapedName;
                                const symbol = resolveName(prop.valueDeclaration, name, 788968 /* Type */, void 0, name, 
                                /*isUse*/
                                false);
                                if ((symbol == null ? void 0 : symbol.declarations) && symbol.declarations.some(isJSDocTypedefTag)) {
                                    addDuplicateDeclarationErrorsForSymbols(symbol, Diagnostics.Duplicate_identifier_0, unescapeLeadingUnderscores(name), prop);
                                    addDuplicateDeclarationErrorsForSymbols(prop, Diagnostics.Duplicate_identifier_0, unescapeLeadingUnderscores(name), symbol);
                                }
                            }
                        }
                    }
                }
                function isIndirectCall(node) {
                    return node.parent.kind === 214 /* ParenthesizedExpression */ && isNumericLiteral(node.left) && node.left.text === "0" && (isCallExpression(node.parent.parent) && node.parent.parent.expression === node.parent || node.parent.parent.kind === 212 /* TaggedTemplateExpression */) && // special-case for "eval" because it's the only non-access case where an indirect call actually affects behavior.
                        (isAccessExpression(node.right) || isIdentifier(node.right) && node.right.escapedText === "eval");
                }
                function checkForDisallowedESSymbolOperand(operator2) {
                    const offendingSymbolOperand = maybeTypeOfKindConsideringBaseConstraint(leftType, 12288 /* ESSymbolLike */) ? left : maybeTypeOfKindConsideringBaseConstraint(rightType, 12288 /* ESSymbolLike */) ? right : void 0;
                    if (offendingSymbolOperand) {
                        error(offendingSymbolOperand, Diagnostics.The_0_operator_cannot_be_applied_to_type_symbol, tokenToString(operator2));
                        return false;
                    }
                    return true;
                }
                function getSuggestedBooleanOperator(operator2) {
                    switch (operator2) {
                        case 51 /* BarToken */:
                        case 74 /* BarEqualsToken */:
                            return 56 /* BarBarToken */;
                        case 52 /* CaretToken */:
                        case 78 /* CaretEqualsToken */:
                            return 37 /* ExclamationEqualsEqualsToken */;
                        case 50 /* AmpersandToken */:
                        case 73 /* AmpersandEqualsToken */:
                            return 55 /* AmpersandAmpersandToken */;
                        default:
                            return void 0;
                    }
                }
                function checkAssignmentOperator(valueType) {
                    if (isAssignmentOperator(operator)) {
                        addLazyDiagnostic(checkAssignmentOperatorWorker);
                    }
                    function checkAssignmentOperatorWorker() {
                        if (checkReferenceExpression(left, Diagnostics.The_left_hand_side_of_an_assignment_expression_must_be_a_variable_or_a_property_access, Diagnostics.The_left_hand_side_of_an_assignment_expression_may_not_be_an_optional_property_access)) {
                            let headMessage;
                            if (exactOptionalPropertyTypes && isPropertyAccessExpression(left) && maybeTypeOfKind(valueType, 32768 /* Undefined */)) {
                                const target = getTypeOfPropertyOfType(getTypeOfExpression(left.expression), left.name.escapedText);
                                if (isExactOptionalPropertyMismatch(valueType, target)) {
                                    headMessage = Diagnostics.Type_0_is_not_assignable_to_type_1_with_exactOptionalPropertyTypes_Colon_true_Consider_adding_undefined_to_the_type_of_the_target;
                                }
                            }
                            checkTypeAssignableToAndOptionallyElaborate(valueType, leftType, left, right, headMessage);
                        }
                    }
                }
                function isAssignmentDeclaration2(kind) {
                    var _a2;
                    switch (kind) {
                        case 2 /* ModuleExports */:
                            return true;
                        case 1 /* ExportsProperty */:
                        case 5 /* Property */:
                        case 6 /* Prototype */:
                        case 3 /* PrototypeProperty */:
                        case 4 /* ThisProperty */:
                            const symbol = getSymbolOfNode(left);
                            const init = getAssignedExpandoInitializer(right);
                            return !!init && isObjectLiteralExpression(init) && !!((_a2 = symbol == null ? void 0 : symbol.exports) == null ? void 0 : _a2.size);
                        default:
                            return false;
                    }
                }
                function reportOperatorErrorUnless(typesAreCompatible) {
                    if (!typesAreCompatible(leftType, rightType)) {
                        reportOperatorError(typesAreCompatible);
                        return true;
                    }
                    return false;
                }
                function reportOperatorError(isRelated) {
                    let wouldWorkWithAwait = false;
                    const errNode = errorNode || operatorToken;
                    if (isRelated) {
                        const awaitedLeftType = getAwaitedTypeNoAlias(leftType);
                        const awaitedRightType = getAwaitedTypeNoAlias(rightType);
                        wouldWorkWithAwait = !(awaitedLeftType === leftType && awaitedRightType === rightType) && !!(awaitedLeftType && awaitedRightType) && isRelated(awaitedLeftType, awaitedRightType);
                    }
                    let effectiveLeft = leftType;
                    let effectiveRight = rightType;
                    if (!wouldWorkWithAwait && isRelated) {
                        [effectiveLeft, effectiveRight] = getBaseTypesIfUnrelated(leftType, rightType, isRelated);
                    }
                    const [leftStr, rightStr] = getTypeNamesForErrorDisplay(effectiveLeft, effectiveRight);
                    if (!tryGiveBetterPrimaryError(errNode, wouldWorkWithAwait, leftStr, rightStr)) {
                        errorAndMaybeSuggestAwait(errNode, wouldWorkWithAwait, Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, tokenToString(operatorToken.kind), leftStr, rightStr);
                    }
                }
                function tryGiveBetterPrimaryError(errNode, maybeMissingAwait, leftStr, rightStr) {
                    switch (operatorToken.kind) {
                        case 36 /* EqualsEqualsEqualsToken */:
                        case 34 /* EqualsEqualsToken */:
                        case 37 /* ExclamationEqualsEqualsToken */:
                        case 35 /* ExclamationEqualsToken */:
                            return errorAndMaybeSuggestAwait(errNode, maybeMissingAwait, Diagnostics.This_comparison_appears_to_be_unintentional_because_the_types_0_and_1_have_no_overlap, leftStr, rightStr);
                        default:
                            return void 0;
                    }
                }
                function checkNaNEquality(errorNode2, operator2, left2, right2) {
                    const isLeftNaN = isGlobalNaN(skipParentheses(left2));
                    const isRightNaN = isGlobalNaN(skipParentheses(right2));
                    if (isLeftNaN || isRightNaN) {
                        const err = error(errorNode2, Diagnostics.This_condition_will_always_return_0, tokenToString(operator2 === 36 /* EqualsEqualsEqualsToken */ || operator2 === 34 /* EqualsEqualsToken */ ? 95 /* FalseKeyword */ : 110 /* TrueKeyword */));
                        if (isLeftNaN && isRightNaN)
                            return;
                        const operatorString = operator2 === 37 /* ExclamationEqualsEqualsToken */ || operator2 === 35 /* ExclamationEqualsToken */ ? tokenToString(53 /* ExclamationToken */) : "";
                        const location = isLeftNaN ? right2 : left2;
                        const expression = skipParentheses(location);
                        addRelatedInfo(err, createDiagnosticForNode(location, Diagnostics.Did_you_mean_0, `${operatorString}Number.isNaN(${isEntityNameExpression(expression) ? entityNameToString(expression) : "..."})`));
                    }
                }
                function isGlobalNaN(expr) {
                    if (isIdentifier(expr) && expr.escapedText === "NaN") {
                        const globalNaNSymbol = getGlobalNaNSymbol();
                        return !!globalNaNSymbol && globalNaNSymbol === getResolvedSymbol(expr);
                    }
                    return false;
                }
            }