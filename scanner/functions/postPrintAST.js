function postPrintAST(ast, parent, walker) {
        var pc = walker.state;
        pc.decreaseIndent();
        return ast;
    }