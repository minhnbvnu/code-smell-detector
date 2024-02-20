function isReadonlyArrayType(type) {
                return !!(getObjectFlags(type) & 4 /* Reference */) && type.target === globalReadonlyArrayType;
            }