function parseTypeLiteral() {
                        const pos = getNodePos();
                        return finishNode(factory2.createTypeLiteralNode(parseObjectTypeMembers()), pos);
                    }