function getConstituentCount(type) {
                return !(type.flags & 3145728 /* UnionOrIntersection */) || type.aliasSymbol ? 1 : type.flags & 1048576 /* Union */ && type.origin ? getConstituentCount(type.origin) : getConstituentCountOfTypes(type.types);
            }