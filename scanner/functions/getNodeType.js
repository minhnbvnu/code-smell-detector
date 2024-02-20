function getNodeType(node) {
                const tsNode = service.esTreeNodeToTSNodeMap.get(node);
                return (0, util_1.getConstrainedTypeAtLocation)(checker, tsNode);
            }