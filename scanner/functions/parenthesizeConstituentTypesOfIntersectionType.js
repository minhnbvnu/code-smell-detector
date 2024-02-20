function parenthesizeConstituentTypesOfIntersectionType(members) {
                return factory2.createNodeArray(sameMap(members, parenthesizeConstituentTypeOfIntersectionType));
            }