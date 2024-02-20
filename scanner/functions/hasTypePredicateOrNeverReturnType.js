function hasTypePredicateOrNeverReturnType(signature) {
                return !!(getTypePredicateOfSignature(signature) || signature.declaration && (getReturnTypeFromAnnotation(signature.declaration) || unknownType).flags & 131072 /* Never */);
            }