function elaborateArrowFunction(node, source, target, relation, containingMessageChain, errorOutputContainer) {
                if (isBlock(node.body)) {
                    return false;
                }
                if (some(node.parameters, hasType)) {
                    return false;
                }
                const sourceSig = getSingleCallSignature(source);
                if (!sourceSig) {
                    return false;
                }
                const targetSignatures = getSignaturesOfType(target, 0 /* Call */);
                if (!length(targetSignatures)) {
                    return false;
                }
                const returnExpression = node.body;
                const sourceReturn = getReturnTypeOfSignature(sourceSig);
                const targetReturn = getUnionType(map(targetSignatures, getReturnTypeOfSignature));
                if (!checkTypeRelatedTo(sourceReturn, targetReturn, relation, 
                /*errorNode*/
                void 0)) {
                    const elaborated = returnExpression && elaborateError(returnExpression, sourceReturn, targetReturn, relation, 
                    /*headMessage*/
                    void 0, containingMessageChain, errorOutputContainer);
                    if (elaborated) {
                        return elaborated;
                    }
                    const resultObj = errorOutputContainer || {};
                    checkTypeRelatedTo(sourceReturn, targetReturn, relation, returnExpression, 
                    /*message*/
                    void 0, containingMessageChain, resultObj);
                    if (resultObj.errors) {
                        if (target.symbol && length(target.symbol.declarations)) {
                            addRelatedInfo(resultObj.errors[resultObj.errors.length - 1], createDiagnosticForNode(target.symbol.declarations[0], Diagnostics.The_expected_type_comes_from_the_return_type_of_this_signature));
                        }
                        if ((getFunctionFlags(node) & 2 /* Async */) === 0 && !getTypeOfPropertyOfType(sourceReturn, "then") && checkTypeRelatedTo(createPromiseType(sourceReturn), targetReturn, relation, 
                        /*errorNode*/
                        void 0)) {
                            addRelatedInfo(resultObj.errors[resultObj.errors.length - 1], createDiagnosticForNode(node, Diagnostics.Did_you_mean_to_mark_this_function_as_async));
                        }
                        return true;
                    }
                }
                return false;
            }