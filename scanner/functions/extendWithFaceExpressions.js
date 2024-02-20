function extendWithFaceExpressions(sourceObj, expressions) {
        var extension = { expressions: expressions };
        return Object.assign({}, sourceObj, extension);
    }