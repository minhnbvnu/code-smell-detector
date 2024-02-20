function createFlowCondition(flags, antecedent, expression) {
                if (antecedent.flags & 1 /* Unreachable */) {
                    return antecedent;
                }
                if (!expression) {
                    return flags & 32 /* TrueCondition */ ? antecedent : unreachableFlow;
                }
                if ((expression.kind === 110 /* TrueKeyword */ && flags & 64 /* FalseCondition */ || expression.kind === 95 /* FalseKeyword */ && flags & 32 /* TrueCondition */) && !isExpressionOfOptionalChainRoot(expression) && !isNullishCoalesce(expression.parent)) {
                    return unreachableFlow;
                }
                if (!isNarrowingExpression(expression)) {
                    return antecedent;
                }
                setFlowNodeReferenced(antecedent);
                return initFlowNode({ flags, antecedent, node: expression });
            }