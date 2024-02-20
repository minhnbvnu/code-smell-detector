function isTupleLikeType(type) {
                return isTupleType(type) || !!getPropertyOfType(type, "0");
            }