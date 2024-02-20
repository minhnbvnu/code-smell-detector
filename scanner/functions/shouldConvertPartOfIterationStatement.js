function shouldConvertPartOfIterationStatement(node) {
                return (resolver.getNodeCheckFlags(node) & 8192 /* ContainsCapturedBlockScopeBinding */) !== 0;
            }