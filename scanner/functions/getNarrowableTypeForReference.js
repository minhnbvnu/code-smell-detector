function getNarrowableTypeForReference(type, reference, checkMode) {
                const substituteConstraints = !(checkMode && checkMode & 2 /* Inferential */) && someType(type, isGenericTypeWithUnionConstraint) && (isConstraintPosition(type, reference) || hasContextualTypeWithNoGenericTypes(reference, checkMode));
                return substituteConstraints ? mapType(type, getBaseConstraintOrType) : type;
            }