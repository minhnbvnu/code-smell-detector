function allTypesAssignableToKind(source, kind, strict) {
                return source.flags & 1048576 /* Union */ ? every(source.types, (subType) => allTypesAssignableToKind(subType, kind, strict)) : isTypeAssignableToKind(source, kind, strict);
            }