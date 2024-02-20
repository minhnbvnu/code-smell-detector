function parseAwaitExpression() {
                        const pos = getNodePos();
                        return finishNode(factory2.createAwaitExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
                    }