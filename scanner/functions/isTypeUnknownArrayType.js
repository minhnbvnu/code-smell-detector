function isTypeUnknownArrayType(type, checker) {
        return (checker.isArrayType(type) &&
            isTypeUnknownType(
            // getTypeArguments was only added in TS3.7
            (0, getTypeArguments_1.getTypeArguments)(type, checker)[0]));
    }