function createUnionTypeNode(types) {
                return createUnionOrIntersectionTypeNode(189 /* UnionType */, types, parenthesizerRules().parenthesizeConstituentTypesOfUnionType);
            }