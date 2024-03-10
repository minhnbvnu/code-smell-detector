                        function renderGraph() {
                            const columnCount = columnWidths.length;
                            const laneCount = nodes.reduce((x, n) => Math.max(x, n.lane), 0) + 1;
                            const lanes = fill(Array(laneCount), "");
                            const grid = columnWidths.map(() => Array(laneCount));
                            const connectors = columnWidths.map(() => fill(Array(laneCount), 0));
                            for (const node of nodes) {
                                grid[node.level][node.lane] = node;
                                const children = getChildren(node);
                                for (let i = 0; i < children.length; i++) {
                                    const child = children[i];
                                    let connector = 8 /* Right */;
                                    if (child.lane === node.lane)
                                        connector |= 4 /* Left */;
                                    if (i > 0)
                                        connector |= 1 /* Up */;
                                    if (i < children.length - 1)
                                        connector |= 2 /* Down */;
                                    connectors[node.level][child.lane] |= connector;
                                }
                                if (children.length === 0) {
                                    connectors[node.level][node.lane] |= 16 /* NoChildren */;
                                }
                                const parents = getParents(node);
                                for (let i = 0; i < parents.length; i++) {
                                    const parent2 = parents[i];
                                    let connector = 4 /* Left */;
                                    if (i > 0)
                                        connector |= 1 /* Up */;
                                    if (i < parents.length - 1)
                                        connector |= 2 /* Down */;
                                    connectors[node.level - 1][parent2.lane] |= connector;
                                }
                            }
                            for (let column = 0; column < columnCount; column++) {
                                for (let lane = 0; lane < laneCount; lane++) {
                                    const left = column > 0 ? connectors[column - 1][lane] : 0;
                                    const above = lane > 0 ? connectors[column][lane - 1] : 0;
                                    let connector = connectors[column][lane];
                                    if (!connector) {
                                        if (left & 8 /* Right */)
                                            connector |= 12 /* LeftRight */;
                                        if (above & 2 /* Down */)
                                            connector |= 3 /* UpDown */;
                                        connectors[column][lane] = connector;
                                    }
                                }
                            }
                            for (let column = 0; column < columnCount; column++) {
                                for (let lane = 0; lane < lanes.length; lane++) {
                                    const connector = connectors[column][lane];
                                    const fill2 = connector & 4 /* Left */ ? "\u2500" /* lr */ : " ";
                                    const node = grid[column][lane];
                                    if (!node) {
                                        if (column < columnCount - 1) {
                                            writeLane(lane, repeat(fill2, columnWidths[column] + 1));
                                        }
                                    }
                                    else {
                                        writeLane(lane, node.text);
                                        if (column < columnCount - 1) {
                                            writeLane(lane, " ");
                                            writeLane(lane, repeat(fill2, columnWidths[column] - node.text.length));
                                        }
                                    }
                                    writeLane(lane, getBoxCharacter(connector));
                                    writeLane(lane, connector & 8 /* Right */ && column < columnCount - 1 && !grid[column + 1][lane] ? "\u2500" /* lr */ : " ");
                                }
                            }
                            return `
${lanes.join("\n")}
`;
                            function writeLane(lane, text) {
                                lanes[lane] += text;
                            }
                        }