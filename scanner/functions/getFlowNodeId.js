function getFlowNodeId(flow) {
                if (!flow.id || flow.id < 0) {
                    flow.id = nextFlowId;
                    nextFlowId++;
                }
                return flow.id;
            }