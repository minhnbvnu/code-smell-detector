function isObjectOrArrayLiteralType(type) {
                return !!(getObjectFlags(type) & (128 /* ObjectLiteral */ | 16384 /* ArrayLiteral */));
            }