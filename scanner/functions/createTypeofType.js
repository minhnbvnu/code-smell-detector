function createTypeofType() {
                return getUnionType(arrayFrom(typeofNEFacts.keys(), getStringLiteralType));
            }