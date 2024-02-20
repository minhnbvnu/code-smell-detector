function isUnconstrainedTypeParameter(type) {
                return type.flags & 262144 /* TypeParameter */ && !getConstraintOfTypeParameter(type);
            }