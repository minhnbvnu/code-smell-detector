function isTypeArrayTypeOrUnionOfArrayTypes(type, checker) {
        for (const t of (0, tsutils_1.unionTypeParts)(type)) {
            if (!checker.isArrayType(t)) {
                return false;
            }
        }
        return true;
    }