function getIterationTypesKeyFromIterationTypeKind(typeKind) {
            switch (typeKind) {
                case 0 /* Yield */:
                    return "yieldType";
                case 1 /* Return */:
                    return "returnType";
                case 2 /* Next */:
                    return "nextType";
            }
        }