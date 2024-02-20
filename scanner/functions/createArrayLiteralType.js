function createArrayLiteralType(type) {
                if (!(getObjectFlags(type) & 4 /* Reference */)) {
                    return type;
                }
                let literalType = type.literalType;
                if (!literalType) {
                    literalType = type.literalType = cloneTypeReference(type);
                    literalType.objectFlags |= 16384 /* ArrayLiteral */ | 131072 /* ContainsObjectOrArrayLiteral */;
                }
                return literalType;
            }