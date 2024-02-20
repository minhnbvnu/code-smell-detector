function getEnumLiteralType(value, enumId, symbol) {
                let type;
                const key = `${enumId}${typeof value === "string" ? "@" : "#"}${value}`;
                const flags = 1024 /* EnumLiteral */ | (typeof value === "string" ? 128 /* StringLiteral */ : 256 /* NumberLiteral */);
                return enumLiteralTypes.get(key) || (enumLiteralTypes.set(key, type = createLiteralType(flags, value, symbol)), type);
            }