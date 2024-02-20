function isGenericIndexType(type) {
                return !!(getGenericObjectFlags(type) & 8388608 /* IsGenericIndexType */);
            }