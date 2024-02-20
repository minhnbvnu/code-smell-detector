function isThisTypeParameter(type) {
            return !!(type.flags & 262144 /* TypeParameter */ && type.isThisType);
        }