function checkFunctionExpressionOrObjectLiteralMethodDeferred(node) {
                Debug.assert(node.kind !== 171 /* MethodDeclaration */ || isObjectLiteralMethod(node));
                const functionFlags = getFunctionFlags(node);
                const returnType = getReturnTypeFromAnnotation(node);
                checkAllCodePathsInNonVoidFunctionReturnOrThrow(node, returnType);
                if (node.body) {
                    if (!getEffectiveReturnTypeNode(node)) {
                        getReturnTypeOfSignature(getSignatureFromDeclaration(node));
                    }
                    if (node.body.kind === 238 /* Block */) {
                        checkSourceElement(node.body);
                    }
                    else {
                        const exprType = checkExpression(node.body);
                        const returnOrPromisedType = returnType && unwrapReturnType(returnType, functionFlags);
                        if (returnOrPromisedType) {
                            if ((functionFlags & 3 /* AsyncGenerator */) === 2 /* Async */) {
                                const awaitedType = checkAwaitedType(exprType, 
                                /*withAlias*/
                                false, node.body, Diagnostics.The_return_type_of_an_async_function_must_either_be_a_valid_promise_or_must_not_contain_a_callable_then_member);
                                checkTypeAssignableToAndOptionallyElaborate(awaitedType, returnOrPromisedType, node.body, node.body);
                            }
                            else {
                                checkTypeAssignableToAndOptionallyElaborate(exprType, returnOrPromisedType, node.body, node.body);
                            }
                        }
                    }
                }
            }