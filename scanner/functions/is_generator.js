function is_generator(node) {
    return node instanceof AST_AsyncGeneratorDefun
        || node instanceof AST_AsyncGeneratorFunction
        || node instanceof AST_GeneratorDefun
        || node instanceof AST_GeneratorFunction;
}