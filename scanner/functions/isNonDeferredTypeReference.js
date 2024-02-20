function isNonDeferredTypeReference(type) {
                return !!(getObjectFlags(type) & 4 /* Reference */) && !type.node;
            }