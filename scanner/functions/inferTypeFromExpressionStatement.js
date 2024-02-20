function inferTypeFromExpressionStatement(node, usage) {
                addCandidateType(usage, isCallExpression(node) ? checker.getVoidType() : checker.getAnyType());
            }