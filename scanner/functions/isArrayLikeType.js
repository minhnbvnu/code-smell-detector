function isArrayLikeType(type) {
                return isArrayType(type) || !(type.flags & 98304 /* Nullable */) && isTypeAssignableTo(type, anyReadonlyArrayType);
            }