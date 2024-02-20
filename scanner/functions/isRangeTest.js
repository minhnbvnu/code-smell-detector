function isRangeTest(node) {
                const left = node.left, right = node.right;
                /**
                 * Determines whether node is of the form `0 <= x && x < 1`.
                 * @returns {boolean} Whether node is a "between" range test.
                 */
                function isBetweenTest() {
                    if (node.operator === "&&" && astUtils.isSameReference(left.right, right.left)) {
                        const leftLiteral = getNormalizedLiteral(left.left);
                        const rightLiteral = getNormalizedLiteral(right.right);
                        if (leftLiteral === null && rightLiteral === null) {
                            return false;
                        }
                        if (rightLiteral === null || leftLiteral === null) {
                            return true;
                        }
                        if (leftLiteral.value <= rightLiteral.value) {
                            return true;
                        }
                    }
                    return false;
                }
                /**
                 * Determines whether node is of the form `x < 0 || 1 <= x`.
                 * @returns {boolean} Whether node is an "outside" range test.
                 */
                function isOutsideTest() {
                    if (node.operator === "||" && astUtils.isSameReference(left.left, right.right)) {
                        const leftLiteral = getNormalizedLiteral(left.right);
                        const rightLiteral = getNormalizedLiteral(right.left);
                        if (leftLiteral === null && rightLiteral === null) {
                            return false;
                        }
                        if (rightLiteral === null || leftLiteral === null) {
                            return true;
                        }
                        if (leftLiteral.value <= rightLiteral.value) {
                            return true;
                        }
                    }
                    return false;
                }
                /**
                 * Determines whether node is wrapped in parentheses.
                 * @returns {boolean} Whether node is preceded immediately by an open
                 *                    paren token and followed immediately by a close
                 *                    paren token.
                 */
                function isParenWrapped() {
                    return astUtils.isParenthesised(sourceCode, node);
                }
                return (node.type === "LogicalExpression" &&
                    left.type === "BinaryExpression" &&
                    right.type === "BinaryExpression" &&
                    isRangeTestOperator(left.operator) &&
                    isRangeTestOperator(right.operator) &&
                    (isBetweenTest() || isOutsideTest()) &&
                    isParenWrapped());
            }