function parenthesizeConstituentTypesOfUnionType(members) {
                return factory2.createNodeArray(sameMap(members, parenthesizeConstituentTypeOfUnionType));
            }