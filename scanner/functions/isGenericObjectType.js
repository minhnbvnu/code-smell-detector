function isGenericObjectType(type) {
                return !!(getGenericObjectFlags(type) & 4194304 /* IsGenericObjectType */);
            }