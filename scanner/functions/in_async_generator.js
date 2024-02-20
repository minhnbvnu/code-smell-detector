function in_async_generator(scope) {
        return scope instanceof AST_AsyncGeneratorDefun || scope instanceof AST_AsyncGeneratorFunction;
    }