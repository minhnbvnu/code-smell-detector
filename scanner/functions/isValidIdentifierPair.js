function isValidIdentifierPair(ctorParam, superArg) {
        return (ctorParam.type === "Identifier" &&
            superArg.type === "Identifier" &&
            ctorParam.name === superArg.name);
    }