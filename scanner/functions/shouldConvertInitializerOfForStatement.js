function shouldConvertInitializerOfForStatement(node) {
                return isForStatement(node) && !!node.initializer && shouldConvertPartOfIterationStatement(node.initializer);
            }