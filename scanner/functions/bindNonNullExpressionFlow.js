function bindNonNullExpressionFlow(node) {
                if (isOptionalChain(node)) {
                    bindOptionalChainFlow(node);
                }
                else {
                    bindEachChild(node);
                }
            }