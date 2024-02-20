function isClassInstanceSide(type) {
                return !!type.symbol && !!(type.symbol.flags & 32 /* Class */) && (type === getDeclaredTypeOfClassOrInterface(type.symbol) || !!(type.flags & 524288 /* Object */) && !!(getObjectFlags(type) & 16777216 /* IsClassInstanceClone */));
            }