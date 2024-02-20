function prePrintAST(ast, parent, walker) {
        var pc = walker.state;
        ast.print(pc);
        pc.increaseIndent();
        return ast;
    }