function isTypeAnyArrayType(type, checker) {
        return (checker.isArrayType(type) &&
            isTypeAnyType(
            // getTypeArguments was only added in TS3.7
            (0, getTypeArguments_1.getTypeArguments)(type, checker)[0]));
    }