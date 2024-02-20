function getAstWalkerFactory() {
        if(!globalAstWalkerFactory) {
            globalAstWalkerFactory = new AstWalkerFactory();
        }
        return globalAstWalkerFactory;
    }