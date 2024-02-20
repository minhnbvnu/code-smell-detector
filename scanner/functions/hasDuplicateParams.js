function hasDuplicateParams(paramsList) {
        return paramsList.every(param => param.type === "Identifier") && paramsList.length !== new Set(paramsList.map(param => param.name)).size;
    }