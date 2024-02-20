function getReturnTypeOfSingleNonGenericCallSignature(funcType) {
                const signature = getSingleCallSignature(funcType);
                if (signature && !signature.typeParameters) {
                    return getReturnTypeOfSignature(signature);
                }
            }