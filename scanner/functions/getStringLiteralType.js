function getStringLiteralType(value) {
                let type;
                return stringLiteralTypes.get(value) || (stringLiteralTypes.set(value, type = createLiteralType(128 /* StringLiteral */, value)), type);
            }