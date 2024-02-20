function computeLanes(node, lane) {
                            if (node.lane === -1) {
                                node.lane = lane;
                                node.endLane = lane;
                                const children = getChildren(node);
                                for (let i = 0; i < children.length; i++) {
                                    if (i > 0)
                                        lane++;
                                    const child = children[i];
                                    computeLanes(child, lane);
                                    if (child.endLane > node.endLane) {
                                        lane = child.endLane;
                                    }
                                }
                                node.endLane = lane;
                            }
                        }