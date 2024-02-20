function describeLiteralType(type) {
        if (type.isStringLiteral()) {
            return JSON.stringify(type.value);
        }
        if (util.isTypeBigIntLiteralType(type)) {
            return `${type.value.negative ? '-' : ''}${type.value.base10Value}n`;
        }
        if (type.isLiteral()) {
            return type.value.toString();
        }
        if (util.isTypeAnyType(type)) {
            return 'any';
        }
        if (util.isTypeNeverType(type)) {
            return 'never';
        }
        if (util.isTypeUnknownType(type)) {
            return 'unknown';
        }
        if (util.isTypeTemplateLiteralType(type)) {
            return 'template literal type';
        }
        if (tsutils.isBooleanLiteralType(type, true)) {
            return 'true';
        }
        if (tsutils.isBooleanLiteralType(type, false)) {
            return 'false';
        }
        return 'literal type';
    }