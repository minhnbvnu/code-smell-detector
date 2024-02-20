function parseDeleteExpression() {
                        const pos = getNodePos();
                        return finishNode(factory2.createDeleteExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
                    }