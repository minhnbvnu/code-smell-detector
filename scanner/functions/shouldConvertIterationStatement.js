function shouldConvertIterationStatement(node) {
                return shouldConvertBodyOfIterationStatement(node) || shouldConvertInitializerOfForStatement(node);
            }