function isIdentifierES6(id, strict) {
            return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
        }