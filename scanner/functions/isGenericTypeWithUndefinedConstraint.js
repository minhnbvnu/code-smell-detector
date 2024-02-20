function isGenericTypeWithUndefinedConstraint(type) {
                return !!(type.flags & 465829888 /* Instantiable */) && maybeTypeOfKind(getBaseConstraintOfType(type) || unknownType, 32768 /* Undefined */);
            }