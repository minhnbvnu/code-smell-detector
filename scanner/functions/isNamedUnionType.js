function isNamedUnionType(type) {
                return !!(type.flags & 1048576 /* Union */ && (type.aliasSymbol || type.origin));
            }