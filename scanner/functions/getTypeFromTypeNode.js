function getTypeFromTypeNode(node) {
                return getConditionalFlowTypeOfType(getTypeFromTypeNodeWorker(node), node);
            }