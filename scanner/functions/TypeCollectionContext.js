function TypeCollectionContext(scopeChain, checker) {
            this.scopeChain = scopeChain;
            this.checker = checker;
            this.script = null;
        }