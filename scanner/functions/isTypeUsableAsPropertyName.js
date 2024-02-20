function isTypeUsableAsPropertyName(type) {
                return !!(type.flags & 8576 /* StringOrNumberLiteralOrUnique */);
            }