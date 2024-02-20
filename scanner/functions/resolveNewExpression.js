function resolveNewExpression(node, candidatesOutArray, checkMode) {
                if (node.arguments && languageVersion < 1 /* ES5 */) {
                    const spreadIndex = getSpreadArgumentIndex(node.arguments);
                    if (spreadIndex >= 0) {
                        error(node.arguments[spreadIndex], Diagnostics.Spread_operator_in_new_expressions_is_only_available_when_targeting_ECMAScript_5_and_higher);
                    }
                }
                let expressionType = checkNonNullExpression(node.expression);
                if (expressionType === silentNeverType) {
                    return silentNeverSignature;
                }
                expressionType = getApparentType(expressionType);
                if (isErrorType(expressionType)) {
                    return resolveErrorCall(node);
                }
                if (isTypeAny(expressionType)) {
                    if (node.typeArguments) {
                        error(node, Diagnostics.Untyped_function_calls_may_not_accept_type_arguments);
                    }
                    return resolveUntypedCall(node);
                }
                const constructSignatures = getSignaturesOfType(expressionType, 1 /* Construct */);
                if (constructSignatures.length) {
                    if (!isConstructorAccessible(node, constructSignatures[0])) {
                        return resolveErrorCall(node);
                    }
                    if (someSignature(constructSignatures, (signature) => !!(signature.flags & 4 /* Abstract */))) {
                        error(node, Diagnostics.Cannot_create_an_instance_of_an_abstract_class);
                        return resolveErrorCall(node);
                    }
                    const valueDecl = expressionType.symbol && getClassLikeDeclarationOfSymbol(expressionType.symbol);
                    if (valueDecl && hasSyntacticModifier(valueDecl, 256 /* Abstract */)) {
                        error(node, Diagnostics.Cannot_create_an_instance_of_an_abstract_class);
                        return resolveErrorCall(node);
                    }
                    return resolveCall(node, constructSignatures, candidatesOutArray, checkMode, 0 /* None */);
                }
                const callSignatures = getSignaturesOfType(expressionType, 0 /* Call */);
                if (callSignatures.length) {
                    const signature = resolveCall(node, callSignatures, candidatesOutArray, checkMode, 0 /* None */);
                    if (!noImplicitAny) {
                        if (signature.declaration && !isJSConstructor(signature.declaration) && getReturnTypeOfSignature(signature) !== voidType) {
                            error(node, Diagnostics.Only_a_void_function_can_be_called_with_the_new_keyword);
                        }
                        if (getThisTypeOfSignature(signature) === voidType) {
                            error(node, Diagnostics.A_function_that_is_called_with_the_new_keyword_cannot_have_a_this_type_that_is_void);
                        }
                    }
                    return signature;
                }
                invocationError(node.expression, expressionType, 1 /* Construct */);
                return resolveErrorCall(node);
            }