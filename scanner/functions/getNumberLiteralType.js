function getNumberLiteralType(value) {
                let type;
                return numberLiteralTypes.get(value) || (numberLiteralTypes.set(value, type = createLiteralType(256 /* NumberLiteral */, value)), type);
            }