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