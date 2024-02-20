function instantiateTypePredicate(predicate, mapper) {
                return createTypePredicate(predicate.kind, predicate.parameterName, predicate.parameterIndex, instantiateType(predicate.type, mapper));
            }