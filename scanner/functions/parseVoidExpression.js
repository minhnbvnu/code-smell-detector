function parseVoidExpression() {
                        const pos = getNodePos();
                        return finishNode(factory2.createVoidExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
                    }