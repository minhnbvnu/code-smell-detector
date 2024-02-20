function isValidRestSpreadPair(ctorParam, superArg) {
        return (ctorParam.type === "RestElement" &&
            superArg.type === "SpreadElement" &&
            isValidIdentifierPair(ctorParam.argument, superArg.argument));
    }