function buildGraphEdge(source, antecedent, seen) {
                            const target = buildGraphNode(antecedent, seen);
                            const edge = { source, target };
                            edges.push(edge);
                            source.edges.push(edge);
                            target.edges.push(edge);
                        }