function attachFlowNodeDebugInfo(flowNode) {
                        if (isDebugInfoEnabled) {
                            if (typeof Object.setPrototypeOf === "function") {
                                if (!flowNodeProto) {
                                    flowNodeProto = Object.create(Object.prototype);
                                    attachFlowNodeDebugInfoWorker(flowNodeProto);
                                }
                                Object.setPrototypeOf(flowNode, flowNodeProto);
                            }
                            else {
                                attachFlowNodeDebugInfoWorker(flowNode);
                            }
                        }
                    }