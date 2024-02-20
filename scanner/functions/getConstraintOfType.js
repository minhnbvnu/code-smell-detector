function getConstraintOfType(type) {
                return type.flags & 262144 /* TypeParameter */ ? getConstraintOfTypeParameter(type) : type.flags & 8388608 /* IndexedAccess */ ? getConstraintOfIndexedAccess(type) : type.flags & 16777216 /* Conditional */ ? getConstraintOfConditionalType(type) : getBaseConstraintOfType(type);
            }