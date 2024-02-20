function isValidPair(ctorParam, superArg) {
        return (isValidIdentifierPair(ctorParam, superArg) ||
            isValidRestSpreadPair(ctorParam, superArg));
    }