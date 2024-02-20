function attachNodeArrayDebugInfo(array) {
                        if (isDebugInfoEnabled) {
                            if (typeof Object.setPrototypeOf === "function") {
                                if (!nodeArrayProto) {
                                    nodeArrayProto = Object.create(Array.prototype);
                                    attachNodeArrayDebugInfoWorker(nodeArrayProto);
                                }
                                Object.setPrototypeOf(array, nodeArrayProto);
                            }
                            else {
                                attachNodeArrayDebugInfoWorker(array);
                            }
                        }
                    }