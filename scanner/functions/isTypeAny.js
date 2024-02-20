function isTypeAny(type) {
                return type && (type.flags & 1 /* Any */) !== 0;
            }