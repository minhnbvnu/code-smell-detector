function isTypeTemplateLiteralType(type) {
        return (0, typeFlagUtils_1.isTypeFlagSet)(type, ts.TypeFlags.TemplateLiteral);
    }