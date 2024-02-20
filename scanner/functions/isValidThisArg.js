function isValidThisArg(expectedThis, thisArg, context) {
        if (!expectedThis) {
            return astUtils.isNullOrUndefined(thisArg);
        }
        return astUtils.equalTokens(expectedThis, thisArg, context);
    }