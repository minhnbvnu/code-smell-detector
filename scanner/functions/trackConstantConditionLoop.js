function trackConstantConditionLoop(node) {
                if (node.test && isConstant(context.getScope(), node.test, true)) {
                    loopsInCurrentScope.add(node);
                }
            }