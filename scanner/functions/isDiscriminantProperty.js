function isDiscriminantProperty(type, name) {
                if (type && type.flags & 1048576 /* Union */) {
                    const prop = getUnionOrIntersectionProperty(type, name);
                    if (prop && getCheckFlags(prop) & 2 /* SyntheticProperty */) {
                        if (prop.links.isDiscriminantProperty === void 0) {
                            prop.links.isDiscriminantProperty = (prop.links.checkFlags & 192 /* Discriminant */) === 192 /* Discriminant */ && !isGenericType(getTypeOfSymbol(prop));
                        }
                        return !!prop.links.isDiscriminantProperty;
                    }
                }
                return false;
            }