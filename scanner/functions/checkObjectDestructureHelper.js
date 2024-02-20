function checkObjectDestructureHelper(receiverNode, senderNode) {
                if (receiverNode.type !== utils_1.AST_NODE_TYPES.ObjectPattern) {
                    return false;
                }
                const senderTsNode = esTreeNodeToTSNodeMap.get(senderNode);
                const senderType = checker.getTypeAtLocation(senderTsNode);
                return checkObjectDestructure(receiverNode, senderType, senderTsNode);
            }