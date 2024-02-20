function shouldConvertConditionOfForStatement(node) {
                return isForStatement(node) && !!node.condition && shouldConvertPartOfIterationStatement(node.condition);
            }