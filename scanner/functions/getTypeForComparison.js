function getTypeForComparison(type) {
                if (util.isTypeReferenceType(type)) {
                    return {
                        type: type.target,
                        typeArguments: util.getTypeArguments(type, checker),
                    };
                }
                return {
                    type,
                    typeArguments: [],
                };
            }