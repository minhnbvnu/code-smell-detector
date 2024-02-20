function getTypeLink(ast, checker, autoVar) {
        var result = new TypeLink();
        result.ast = ast;
        if((ast == null) && (autoVar)) {
            result.type = checker.anyType;
        } else {
            result.type = null;
        }
        return result;
    }