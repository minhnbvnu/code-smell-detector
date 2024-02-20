function shouldConvertIncrementorOfForStatement(node) {
                return isForStatement(node) && !!node.incrementor && shouldConvertPartOfIterationStatement(node.incrementor);
            }