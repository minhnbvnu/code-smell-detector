function maybeCloneTypeParameter(p) {
                const constraint = getConstraintOfTypeParameter(p);
                return constraint && (isGenericObjectType(constraint) || isGenericIndexType(constraint)) ? cloneTypeParameter(p) : p;
            }