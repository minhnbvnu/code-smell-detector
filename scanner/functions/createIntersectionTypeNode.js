function createIntersectionTypeNode(types) {
                return createUnionOrIntersectionTypeNode(190 /* IntersectionType */, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType);
            }