function makeBinaryExpression(left, operatorToken, right, pos) {
                        return finishNode(factory2.createBinaryExpression(left, operatorToken, right), pos);
                    }