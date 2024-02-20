function inferTypeFromContextualType(node, usage) {
                if (isExpressionNode(node)) {
                    addCandidateType(usage, checker.getContextualType(node));
                }
            }