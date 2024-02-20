function getBigIntLiteralType(value) {
                let type;
                const key = pseudoBigIntToString(value);
                return bigIntLiteralTypes.get(key) || (bigIntLiteralTypes.set(key, type = createLiteralType(2048 /* BigIntLiteral */, value)), type);
            }