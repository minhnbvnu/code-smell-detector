function getApparentProperties(type, node, checker) {
            if (!type.isUnion())
                return type.getApparentProperties();
            return checker.getAllPossiblePropertiesOfTypes(filter(type.types, (memberType) => !(memberType.flags & 134348796 /* Primitive */ || checker.isArrayLikeType(memberType) || checker.isTypeInvalidDueToUnionDiscriminant(memberType, node) || checker.typeHasCallOrConstructSignatures(memberType) || memberType.isClass() && containsNonPublicProperties(memberType.getApparentProperties()))));
        }