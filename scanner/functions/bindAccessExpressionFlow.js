function bindAccessExpressionFlow(node) {
                if (isOptionalChain(node)) {
                    bindOptionalChainFlow(node);
                }
                else {
                    bindEachChild(node);
                }
            }