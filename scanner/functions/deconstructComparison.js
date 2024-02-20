function deconstructComparison(node) {
                const comparisonType = getEqualsKind(node.operator);
                if (!comparisonType) {
                    return undefined;
                }
                for (const [against, expression] of [
                    [node.right, node.left],
                    [node.left, node.right],
                ]) {
                    if (against.type !== utils_1.AST_NODE_TYPES.Literal ||
                        typeof against.value !== 'boolean') {
                        continue;
                    }
                    const { value: literalBooleanInComparison } = against;
                    const negated = !comparisonType.isPositive;
                    return {
                        literalBooleanInComparison,
                        forTruthy: literalBooleanInComparison ? !negated : negated,
                        expression,
                        negated,
                    };
                }
                return undefined;
            }