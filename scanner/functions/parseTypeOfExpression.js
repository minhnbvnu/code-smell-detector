function parseTypeOfExpression() {
                        const pos = getNodePos();
                        return finishNode(factory2.createTypeOfExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
                    }