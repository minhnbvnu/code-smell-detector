function elaborateDidYouMeanToCallOrConstruct(node, source, target, relation, headMessage, containingMessageChain, errorOutputContainer) {
                const callSignatures = getSignaturesOfType(source, 0 /* Call */);
                const constructSignatures = getSignaturesOfType(source, 1 /* Construct */);
                for (const signatures of [constructSignatures, callSignatures]) {
                    if (some(signatures, (s) => {
                        const returnType = getReturnTypeOfSignature(s);
                        return !(returnType.flags & (1 /* Any */ | 131072 /* Never */)) && checkTypeRelatedTo(returnType, target, relation, 
                        /*errorNode*/
                        void 0);
                    })) {
                        const resultObj = errorOutputContainer || {};
                        checkTypeAssignableTo(source, target, node, headMessage, containingMessageChain, resultObj);
                        const diagnostic = resultObj.errors[resultObj.errors.length - 1];
                        addRelatedInfo(diagnostic, createDiagnosticForNode(node, signatures === constructSignatures ? Diagnostics.Did_you_mean_to_use_new_with_this_expression : Diagnostics.Did_you_mean_to_call_this_expression));
                        return true;
                    }
                }
                return false;
            }