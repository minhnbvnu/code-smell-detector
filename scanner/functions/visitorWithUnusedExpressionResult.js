function visitorWithUnusedExpressionResult(node) {
                return shouldVisitNode(node) ? visitorWorker(node, 
                /*expressionResultIsUnused*/
                true) : node;
            }