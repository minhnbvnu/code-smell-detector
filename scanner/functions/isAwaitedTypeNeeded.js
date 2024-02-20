function isAwaitedTypeNeeded(type) {
                if (isTypeAny(type) || isAwaitedTypeInstantiation(type)) {
                    return false;
                }
                if (isGenericObjectType(type)) {
                    const baseConstraint = getBaseConstraintOfType(type);
                    if (baseConstraint ? baseConstraint.flags & 3 /* AnyOrUnknown */ || isEmptyObjectType(baseConstraint) || someType(baseConstraint, isThenableType) : maybeTypeOfKind(type, 8650752 /* TypeVariable */)) {
                        return true;
                    }
                }
                return false;
            }