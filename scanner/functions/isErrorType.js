function isErrorType(type) {
                return type === errorType || !!(type.flags & 1 /* Any */ && type.aliasSymbol);
            }