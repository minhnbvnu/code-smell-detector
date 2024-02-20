function getPrimitiveLiteralFromType(t) {
        if (exports.isTypeFlagSet(t, ts.TypeFlags.Null))
            return 'null';
        if (exports.isTypeFlagSet(t, ts.TypeFlags.Undefined))
            return 'undefined';
        if (exports.isTypeFlagSet(t, ts.TypeFlags.NumberLiteral))
            return `${exports.isTypeFlagSet(t, ts.TypeFlags.EnumLiteral) ? 'enum:' : ''}${t.value}`;
        if (exports.isTypeFlagSet(t, ts.TypeFlags.StringLiteral))
            return `${exports.isTypeFlagSet(t, ts.TypeFlags.EnumLiteral) ? 'enum:' : ''}string:${t.value}`;
        if (exports.isTypeFlagSet(t, ts.TypeFlags.BigIntLiteral))
            return formatPseudoBigInt(t.value);
        if (_3_2_1.isUniqueESSymbolType(t))
            return t.escapedName;
        if (type_1.isBooleanLiteralType(t, true))
            return 'true';
        if (type_1.isBooleanLiteralType(t, false))
            return 'false';
    }