function makeAsExpression(left, right) {
                        return finishNode(factory2.createAsExpression(left, right), left.pos);
                    }