function isConstructorType(type) {
                if (getSignaturesOfType(type, 1 /* Construct */).length > 0) {
                    return true;
                }
                if (type.flags & 8650752 /* TypeVariable */) {
                    const constraint = getBaseConstraintOfType(type);
                    return !!constraint && isMixinConstructorType(constraint);
                }
                return false;
            }