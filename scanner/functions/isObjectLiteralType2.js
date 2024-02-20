function isObjectLiteralType2(type) {
                return !!(getObjectFlags(type) & 128 /* ObjectLiteral */);
            }