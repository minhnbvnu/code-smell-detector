function areTypesComparable(type1, type2) {
                return isTypeComparableTo(type1, type2) || isTypeComparableTo(type2, type1);
            }