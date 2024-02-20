function functionHasImplicitReturn(func) {
                return func.endFlowNode && isReachableFlowNode(func.endFlowNode);
            }