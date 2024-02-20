function getBaseConstraintOfType(type) {
                if (type.flags & (58982400 /* InstantiableNonPrimitive */ | 3145728 /* UnionOrIntersection */ | 134217728 /* TemplateLiteral */ | 268435456 /* StringMapping */)) {
                    const constraint = getResolvedBaseConstraint(type);
                    return constraint !== noConstraintType && constraint !== circularConstraintType ? constraint : void 0;
                }
                return type.flags & 4194304 /* Index */ ? keyofConstraintType : void 0;
            }