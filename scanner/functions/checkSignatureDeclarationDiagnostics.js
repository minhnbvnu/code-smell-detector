function checkSignatureDeclarationDiagnostics() {
                    checkCollisionWithArgumentsInGeneratedCode(node);
                    const returnTypeNode = getEffectiveReturnTypeNode(node);
                    if (noImplicitAny && !returnTypeNode) {
                        switch (node.kind) {
                            case 177 /* ConstructSignature */:
                                error(node, Diagnostics.Construct_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                                break;
                            case 176 /* CallSignature */:
                                error(node, Diagnostics.Call_signature_which_lacks_return_type_annotation_implicitly_has_an_any_return_type);
                                break;
                        }
                    }
                    if (returnTypeNode) {
                        const functionFlags2 = getFunctionFlags(node);
                        if ((functionFlags2 & (4 /* Invalid */ | 1 /* Generator */)) === 1 /* Generator */) {
                            const returnType = getTypeFromTypeNode(returnTypeNode);
                            if (returnType === voidType) {
                                error(returnTypeNode, Diagnostics.A_generator_cannot_have_a_void_type_annotation);
                            }
                            else {
                                const generatorYieldType = getIterationTypeOfGeneratorFunctionReturnType(0 /* Yield */, returnType, (functionFlags2 & 2 /* Async */) !== 0) || anyType;
                                const generatorReturnType = getIterationTypeOfGeneratorFunctionReturnType(1 /* Return */, returnType, (functionFlags2 & 2 /* Async */) !== 0) || generatorYieldType;
                                const generatorNextType = getIterationTypeOfGeneratorFunctionReturnType(2 /* Next */, returnType, (functionFlags2 & 2 /* Async */) !== 0) || unknownType;
                                const generatorInstantiation = createGeneratorReturnType(generatorYieldType, generatorReturnType, generatorNextType, !!(functionFlags2 & 2 /* Async */));
                                checkTypeAssignableTo(generatorInstantiation, returnType, returnTypeNode);
                            }
                        }
                        else if ((functionFlags2 & 3 /* AsyncGenerator */) === 2 /* Async */) {
                            checkAsyncFunctionReturnType(node, returnTypeNode);
                        }
                    }
                    if (node.kind !== 178 /* IndexSignature */ && node.kind !== 320 /* JSDocFunctionType */) {
                        registerForUnusedIdentifiersCheck(node);
                    }
                }