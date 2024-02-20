function intersectTypes(type1, type2) {
                return !type1 ? type2 : !type2 ? type1 : getIntersectionType([type1, type2]);
            }