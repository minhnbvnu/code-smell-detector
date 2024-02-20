function isReachableFlowNode(flow) {
                const result = isReachableFlowNodeWorker(flow, 
                /*noCacheCheck*/
                false);
                lastFlowNode = flow;
                lastFlowNodeReachable = result;
                return result;
            }