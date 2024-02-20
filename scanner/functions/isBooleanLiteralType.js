function isBooleanLiteralType(type, literal) {
        return util_1.isTypeFlagSet(type, ts.TypeFlags.BooleanLiteral) &&
            type.intrinsicName === (literal ? 'true' : 'false');
    }