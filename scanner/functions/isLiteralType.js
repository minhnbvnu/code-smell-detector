function isLiteralType(type) {
        return (type.flags & (ts.TypeFlags.StringOrNumberLiteral | ts.TypeFlags.BigIntLiteral)) !== 0;
    }