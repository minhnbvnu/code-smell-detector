function visitRegExpAST(node, handlers) {
        new RegExpVisitor(handlers).visit(node);
    }