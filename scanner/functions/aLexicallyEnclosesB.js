function aLexicallyEnclosesB(a, b) {
        if(a.declAST && b && b.declAST && a.declAST.nodeType == TypeScript.NodeType.FuncDecl) {
            return a.declAST.minChar <= b.declAST.minChar && a.declAST.limChar >= b.declAST.limChar;
        } else {
            return false;
        }
    }