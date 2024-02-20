function isTypeParameterAtTopLevelInReturnType(signature, typeParameter) {
                const typePredicate = getTypePredicateOfSignature(signature);
                return typePredicate ? !!typePredicate.type && isTypeParameterAtTopLevel(typePredicate.type, typeParameter) : isTypeParameterAtTopLevel(getReturnTypeOfSignature(signature), typeParameter);
            }