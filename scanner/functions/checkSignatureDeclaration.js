function checkSignatureDeclaration(node) {
                if (node.kind === 178 /* IndexSignature */) {
                    checkGrammarIndexSignature(node);
                }
                else if (node.kind === 181 /* FunctionType */ || node.kind === 259 /* FunctionDeclaration */ || node.kind === 182 /* ConstructorType */ || node.kind === 176 /* CallSignature */ || node.kind === 173 /* Constructor */ || node.kind === 177 /* ConstructSignature */) {
                    checkGrammarFunctionLikeDeclaration(node);
                }
                const functionFlags = getFunctionFlags(node);
                if (!(functionFlags & 4 /* Invalid */)) {
                    if ((functionFlags & 3 /* AsyncGenerator */) === 3 /* AsyncGenerator */ && languageVersion < 99 /* ESNext */) {
                        checkExternalEmitHelpers(node, 6144 /* AsyncGeneratorIncludes */);
                    }
                    if ((functionFlags & 3 /* AsyncGenerator */) === 2 /* Async */ && languageVersion < 4 /* ES2017 */) {
                        checkExternalEmitHelpers(node, 64 /* Awaiter */);
                    }
                    if ((functionFlags & 3 /* AsyncGenerator */) !== 0 /* Normal */ && languageVersion < 2 /* ES2015 */) {
                        checkExternalEmitHelpers(node, 128 /* Generator */);
                    }
                }
                checkTypeParameters(getEffectiveTypeParameterDeclarations(node));
                checkUnmatchedJSDocParameters(node);
                forEach(node.parameters, checkParameter);
                if (node.type) {
                    checkSourceElement(node.type);
                }
                addLazyDiagnostic(checkSignatureDeclarationDiagnostics);
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
            }