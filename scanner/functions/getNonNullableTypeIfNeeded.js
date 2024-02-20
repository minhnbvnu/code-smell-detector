function getNonNullableTypeIfNeeded(type) {
                return isNullableType(type) ? getNonNullableType(type) : type;
            }