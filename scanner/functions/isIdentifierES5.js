function isIdentifierES5(id, strict) {
            return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
        }