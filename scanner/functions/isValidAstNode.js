function isValidAstNode(ast) {
        if(ast === null) {
            return false;
        }
        if(ast.minChar === -1 || ast.limChar === -1) {
            return false;
        }
        return true;
    }