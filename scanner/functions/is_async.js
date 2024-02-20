function is_async(node) {
    return node instanceof AST_AsyncArrow
        || node instanceof AST_AsyncDefun
        || node instanceof AST_AsyncFunction
        || node instanceof AST_AsyncGeneratorDefun
        || node instanceof AST_AsyncGeneratorFunction;
}