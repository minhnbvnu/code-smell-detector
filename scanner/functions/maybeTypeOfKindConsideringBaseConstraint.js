function maybeTypeOfKindConsideringBaseConstraint(type, kind) {
                if (maybeTypeOfKind(type, kind)) {
                    return true;
                }
                const baseConstraint = getBaseConstraintOrType(type);
                return !!baseConstraint && maybeTypeOfKind(baseConstraint, kind);
            }