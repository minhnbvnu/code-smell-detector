function applyToReturnTypes(source, target, callback) {
                const sourceTypePredicate = getTypePredicateOfSignature(source);
                const targetTypePredicate = getTypePredicateOfSignature(target);
                if (sourceTypePredicate && targetTypePredicate && typePredicateKindsMatch(sourceTypePredicate, targetTypePredicate) && sourceTypePredicate.type && targetTypePredicate.type) {
                    callback(sourceTypePredicate.type, targetTypePredicate.type);
                }
                else {
                    callback(getReturnTypeOfSignature(source), getReturnTypeOfSignature(target));
                }
            }