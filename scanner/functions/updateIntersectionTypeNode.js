function updateIntersectionTypeNode(node, types) {
                return updateUnionOrIntersectionTypeNode(node, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType);
            }