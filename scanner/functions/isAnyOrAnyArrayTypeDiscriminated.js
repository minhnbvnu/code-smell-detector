function isAnyOrAnyArrayTypeDiscriminated(node, checker) {
        const type = checker.getTypeAtLocation(node);
        if (isTypeAnyType(type)) {
            return AnyType.Any;
        }
        if (isTypeAnyArrayType(type, checker)) {
            return AnyType.AnyArray;
        }
        return AnyType.Safe;
    }