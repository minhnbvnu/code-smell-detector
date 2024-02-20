function getTypePredicateOfSignature(signature) {
                if (!signature.resolvedTypePredicate) {
                    if (signature.target) {
                        const targetTypePredicate = getTypePredicateOfSignature(signature.target);
                        signature.resolvedTypePredicate = targetTypePredicate ? instantiateTypePredicate(targetTypePredicate, signature.mapper) : noTypePredicate;
                    }
                    else if (signature.compositeSignatures) {
                        signature.resolvedTypePredicate = getUnionOrIntersectionTypePredicate(signature.compositeSignatures, signature.compositeKind) || noTypePredicate;
                    }
                    else {
                        const type = signature.declaration && getEffectiveReturnTypeNode(signature.declaration);
                        let jsdocPredicate;
                        if (!type) {
                            const jsdocSignature = getSignatureOfTypeTag(signature.declaration);
                            if (jsdocSignature && signature !== jsdocSignature) {
                                jsdocPredicate = getTypePredicateOfSignature(jsdocSignature);
                            }
                        }
                        signature.resolvedTypePredicate = type && isTypePredicateNode(type) ? createTypePredicateFromTypePredicateNode(type, signature) : jsdocPredicate || noTypePredicate;
                    }
                    Debug.assert(!!signature.resolvedTypePredicate);
                }
                return signature.resolvedTypePredicate === noTypePredicate ? void 0 : signature.resolvedTypePredicate;
            }