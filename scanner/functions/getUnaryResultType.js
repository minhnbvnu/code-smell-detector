function getUnaryResultType(operandType) {
                if (maybeTypeOfKind(operandType, 2112 /* BigIntLike */)) {
                    return isTypeAssignableToKind(operandType, 3 /* AnyOrUnknown */) || maybeTypeOfKind(operandType, 296 /* NumberLike */) ? numberOrBigIntType : bigintType;
                }
                return numberType;
            }