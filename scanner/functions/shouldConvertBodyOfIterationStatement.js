function shouldConvertBodyOfIterationStatement(node) {
                return (resolver.getNodeCheckFlags(node) & 4096 /* LoopWithCapturedBlockScopedBinding */) !== 0;
            }