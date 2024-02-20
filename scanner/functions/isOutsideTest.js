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