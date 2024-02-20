function isImplementationCompatibleWithOverload(implementation, overload) {
                const erasedSource = getErasedSignature(implementation);
                const erasedTarget = getErasedSignature(overload);
                const sourceReturnType = getReturnTypeOfSignature(erasedSource);
                const targetReturnType = getReturnTypeOfSignature(erasedTarget);
                if (targetReturnType === voidType || isTypeRelatedTo(targetReturnType, sourceReturnType, assignableRelation) || isTypeRelatedTo(sourceReturnType, targetReturnType, assignableRelation)) {
                    return isSignatureAssignableTo(erasedSource, erasedTarget, 
                    /*ignoreReturnTypes*/
                    true);
                }
                return false;
            }