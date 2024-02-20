function parsePrefixUnaryExpression() {
                        const pos = getNodePos();
                        return finishNode(factory2.createPrefixUnaryExpression(token(), nextTokenAnd(parseSimpleUnaryExpression)), pos);
                    }