function convertForStatement(node, initializerFunction, convertedLoopBody) {
                const shouldConvertCondition = node.condition && shouldConvertPartOfIterationStatement(node.condition);
                const shouldConvertIncrementor = shouldConvertCondition || node.incrementor && shouldConvertPartOfIterationStatement(node.incrementor);
                return factory2.updateForStatement(node, visitNode(initializerFunction ? initializerFunction.part : node.initializer, visitorWithUnusedExpressionResult, isForInitializer), visitNode(shouldConvertCondition ? void 0 : node.condition, visitor, isExpression), visitNode(shouldConvertIncrementor ? void 0 : node.incrementor, visitorWithUnusedExpressionResult, isExpression), convertedLoopBody);
            }