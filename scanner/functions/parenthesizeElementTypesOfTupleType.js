function parenthesizeElementTypesOfTupleType(types) {
                return factory2.createNodeArray(sameMap(types, parenthesizeElementTypeOfTupleType));
            }