function indexTypeLessThan(indexType, limit) {
                return everyType(indexType, (t) => {
                    if (t.flags & 384 /* StringOrNumberLiteral */) {
                        const propName = getPropertyNameFromType(t);
                        if (isNumericLiteralName(propName)) {
                            const index = +propName;
                            return index >= 0 && index < limit;
                        }
                    }
                    return false;
                });
            }