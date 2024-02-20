function getBaseTypeOfLiteralType(type) {
                if (type.isNumberLiteral()) {
                    return 'number';
                }
                if (type.isStringLiteral() ||
                    util.isTypeFlagSet(type, ts.TypeFlags.TemplateLiteral)) {
                    return 'string';
                }
                // is BigIntLiteral
                if (type.flags & ts.TypeFlags.BigIntLiteral) {
                    return 'bigint';
                }
                if (type.isUnion()) {
                    const types = type.types.map(getBaseTypeOfLiteralType);
                    return types.every(value => value === types[0]) ? types[0] : 'invalid';
                }
                if (type.isIntersection()) {
                    const types = type.types.map(getBaseTypeOfLiteralType);
                    if (types.some(value => value === 'string')) {
                        return 'string';
                    }
                    if (types.some(value => value === 'number')) {
                        return 'number';
                    }
                    if (types.some(value => value === 'bigint')) {
                        return 'bigint';
                    }
                    return 'invalid';
                }
                const stringType = typeChecker.typeToString(type);
                if (stringType === 'number' ||
                    stringType === 'string' ||
                    stringType === 'bigint' ||
                    stringType === 'any') {
                    return stringType;
                }
                return 'invalid';
            }