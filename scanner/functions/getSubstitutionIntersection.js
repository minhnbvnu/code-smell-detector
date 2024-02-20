function getSubstitutionIntersection(substitutionType) {
                return getIntersectionType([substitutionType.constraint, substitutionType.baseType]);
            }