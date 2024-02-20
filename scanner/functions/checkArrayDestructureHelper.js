function checkArrayDestructureHelper(receiverNode, senderNode) {
                if (receiverNode.type !== utils_1.AST_NODE_TYPES.ArrayPattern) {
                    return false;
                }
                const senderTsNode = esTreeNodeToTSNodeMap.get(senderNode);
                const senderType = checker.getTypeAtLocation(senderTsNode);
                return checkArrayDestructure(receiverNode, senderType, senderTsNode);
            }