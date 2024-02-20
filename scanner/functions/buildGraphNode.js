function buildGraphNode(flowNode2, seen) {
                            const id = getDebugFlowNodeId(flowNode2);
                            let graphNode = links[id];
                            if (graphNode && seen.has(flowNode2)) {
                                graphNode.circular = true;
                                graphNode = {
                                    id: -1,
                                    flowNode: flowNode2,
                                    edges: [],
                                    text: "",
                                    lane: -1,
                                    endLane: -1,
                                    level: -1,
                                    circular: "circularity"
                                };
                                nodes.push(graphNode);
                                return graphNode;
                            }
                            seen.add(flowNode2);
                            if (!graphNode) {
                                links[id] = graphNode = { id, flowNode: flowNode2, edges: [], text: "", lane: -1, endLane: -1, level: -1, circular: false };
                                nodes.push(graphNode);
                                if (hasAntecedents(flowNode2)) {
                                    for (const antecedent of flowNode2.antecedents) {
                                        buildGraphEdge(graphNode, antecedent, seen);
                                    }
                                }
                                else if (hasAntecedent(flowNode2)) {
                                    buildGraphEdge(graphNode, flowNode2.antecedent, seen);
                                }
                            }
                            seen.delete(flowNode2);
                            return graphNode;
                        }