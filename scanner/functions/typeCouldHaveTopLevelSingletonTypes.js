function typeCouldHaveTopLevelSingletonTypes(type) {
                if (type.flags & 16 /* Boolean */) {
                    return false;
                }
                if (type.flags & 3145728 /* UnionOrIntersection */) {
                    return !!forEach(type.types, typeCouldHaveTopLevelSingletonTypes);
                }
                if (type.flags & 465829888 /* Instantiable */) {
                    const constraint = getConstraintOfType(type);
                    if (constraint && constraint !== type) {
                        return typeCouldHaveTopLevelSingletonTypes(constraint);
                    }
                }
                return isUnitType(type) || !!(type.flags & 134217728 /* TemplateLiteral */) || !!(type.flags & 268435456 /* StringMapping */);
            }