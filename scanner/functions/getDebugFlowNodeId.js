function getDebugFlowNodeId(f) {
                            if (!f.id) {
                                f.id = nextDebugFlowId;
                                nextDebugFlowId--;
                            }
                            return f.id;
                        }