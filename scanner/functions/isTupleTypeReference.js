function isTupleTypeReference(type) {
        return type_1.isTypeReference(type) && isTupleType(type.target);
    }