function formatControlFlowGraph(flowNode) {
                        let nextDebugFlowId = -1;
                        function getDebugFlowNodeId(f) {
                            if (!f.id) {
                                f.id = nextDebugFlowId;
                                nextDebugFlowId--;
                            }
                            return f.id;
                        }
                        let BoxCharacter;
                        ((BoxCharacter2) => {
                            BoxCharacter2["lr"] = "\u2500";
                            BoxCharacter2["ud"] = "\u2502";
                            BoxCharacter2["dr"] = "\u256D";
                            BoxCharacter2["dl"] = "\u256E";
                            BoxCharacter2["ul"] = "\u256F";
                            BoxCharacter2["ur"] = "\u2570";
                            BoxCharacter2["udr"] = "\u251C";
                            BoxCharacter2["udl"] = "\u2524";
                            BoxCharacter2["dlr"] = "\u252C";
                            BoxCharacter2["ulr"] = "\u2534";
                            BoxCharacter2["udlr"] = "\u256B";
                        })(BoxCharacter || (BoxCharacter = {}));
                        let Connection;
                        ((Connection2) => {
                            Connection2[Connection2["None"] = 0] = "None";
                            Connection2[Connection2["Up"] = 1] = "Up";
                            Connection2[Connection2["Down"] = 2] = "Down";
                            Connection2[Connection2["Left"] = 4] = "Left";
                            Connection2[Connection2["Right"] = 8] = "Right";
                            Connection2[Connection2["UpDown"] = 3] = "UpDown";
                            Connection2[Connection2["LeftRight"] = 12] = "LeftRight";
                            Connection2[Connection2["UpLeft"] = 5] = "UpLeft";
                            Connection2[Connection2["UpRight"] = 9] = "UpRight";
                            Connection2[Connection2["DownLeft"] = 6] = "DownLeft";
                            Connection2[Connection2["DownRight"] = 10] = "DownRight";
                            Connection2[Connection2["UpDownLeft"] = 7] = "UpDownLeft";
                            Connection2[Connection2["UpDownRight"] = 11] = "UpDownRight";
                            Connection2[Connection2["UpLeftRight"] = 13] = "UpLeftRight";
                            Connection2[Connection2["DownLeftRight"] = 14] = "DownLeftRight";
                            Connection2[Connection2["UpDownLeftRight"] = 15] = "UpDownLeftRight";
                            Connection2[Connection2["NoChildren"] = 16] = "NoChildren";
                        })(Connection || (Connection = {}));
                        const hasAntecedentFlags = 16 /* Assignment */ | 96 /* Condition */ | 128 /* SwitchClause */ | 256 /* ArrayMutation */ | 512 /* Call */ | 1024 /* ReduceLabel */;
                        const hasNodeFlags = 2 /* Start */ | 16 /* Assignment */ | 512 /* Call */ | 96 /* Condition */ | 256 /* ArrayMutation */;
                        const links = /* @__PURE__ */ Object.create(
                        /*o*/
                        null);
                        const nodes = [];
                        const edges = [];
                        const root = buildGraphNode(flowNode, /* @__PURE__ */ new Set());
                        for (const node of nodes) {
                            node.text = renderFlowNode(node.flowNode, node.circular);
                            computeLevel(node);
                        }
                        const height = computeHeight(root);
                        const columnWidths = computeColumnWidths(height);
                        computeLanes(root, 0);
                        return renderGraph();
                        function isFlowSwitchClause(f) {
                            return !!(f.flags & 128 /* SwitchClause */);
                        }
                        function hasAntecedents(f) {
                            return !!(f.flags & 12 /* Label */) && !!f.antecedents;
                        }
                        function hasAntecedent(f) {
                            return !!(f.flags & hasAntecedentFlags);
                        }
                        function hasNode(f) {
                            return !!(f.flags & hasNodeFlags);
                        }
                        function getChildren(node) {
                            const children = [];
                            for (const edge of node.edges) {
                                if (edge.source === node) {
                                    children.push(edge.target);
                                }
                            }
                            return children;
                        }
                        function getParents(node) {
                            const parents = [];
                            for (const edge of node.edges) {
                                if (edge.target === node) {
                                    parents.push(edge.source);
                                }
                            }
                            return parents;
                        }
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
                        function buildGraphEdge(source, antecedent, seen) {
                            const target = buildGraphNode(antecedent, seen);
                            const edge = { source, target };
                            edges.push(edge);
                            source.edges.push(edge);
                            target.edges.push(edge);
                        }
                        function computeLevel(node) {
                            if (node.level !== -1) {
                                return node.level;
                            }
                            let level = 0;
                            for (const parent2 of getParents(node)) {
                                level = Math.max(level, computeLevel(parent2) + 1);
                            }
                            return node.level = level;
                        }
                        function computeHeight(node) {
                            let height2 = 0;
                            for (const child of getChildren(node)) {
                                height2 = Math.max(height2, computeHeight(child));
                            }
                            return height2 + 1;
                        }
                        function computeColumnWidths(height2) {
                            const columns = fill(Array(height2), 0);
                            for (const node of nodes) {
                                columns[node.level] = Math.max(columns[node.level], node.text.length);
                            }
                            return columns;
                        }
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
                        function getHeader(flags) {
                            if (flags & 2 /* Start */)
                                return "Start";
                            if (flags & 4 /* BranchLabel */)
                                return "Branch";
                            if (flags & 8 /* LoopLabel */)
                                return "Loop";
                            if (flags & 16 /* Assignment */)
                                return "Assignment";
                            if (flags & 32 /* TrueCondition */)
                                return "True";
                            if (flags & 64 /* FalseCondition */)
                                return "False";
                            if (flags & 128 /* SwitchClause */)
                                return "SwitchClause";
                            if (flags & 256 /* ArrayMutation */)
                                return "ArrayMutation";
                            if (flags & 512 /* Call */)
                                return "Call";
                            if (flags & 1024 /* ReduceLabel */)
                                return "ReduceLabel";
                            if (flags & 1 /* Unreachable */)
                                return "Unreachable";
                            throw new Error();
                        }
                        function getNodeText(node) {
                            const sourceFile = getSourceFileOfNode(node);
                            return getSourceTextOfNodeFromSourceFile(sourceFile, node, 
                            /*includeTrivia*/
                            false);
                        }
                        function renderFlowNode(flowNode2, circular) {
                            let text = getHeader(flowNode2.flags);
                            if (circular) {
                                text = `${text}#${getDebugFlowNodeId(flowNode2)}`;
                            }
                            if (hasNode(flowNode2)) {
                                if (flowNode2.node) {
                                    text += ` (${getNodeText(flowNode2.node)})`;
                                }
                            }
                            else if (isFlowSwitchClause(flowNode2)) {
                                const clauses = [];
                                for (let i = flowNode2.clauseStart; i < flowNode2.clauseEnd; i++) {
                                    const clause = flowNode2.switchStatement.caseBlock.clauses[i];
                                    if (isDefaultClause(clause)) {
                                        clauses.push("default");
                                    }
                                    else {
                                        clauses.push(getNodeText(clause.expression));
                                    }
                                }
                                text += ` (${clauses.join(", ")})`;
                            }
                            return circular === "circularity" ? `Circular(${text})` : text;
                        }
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
                        function getBoxCharacter(connector) {
                            switch (connector) {
                                case 3 /* UpDown */:
                                    return "\u2502" /* ud */;
                                case 12 /* LeftRight */:
                                    return "\u2500" /* lr */;
                                case 5 /* UpLeft */:
                                    return "\u256F" /* ul */;
                                case 9 /* UpRight */:
                                    return "\u2570" /* ur */;
                                case 6 /* DownLeft */:
                                    return "\u256E" /* dl */;
                                case 10 /* DownRight */:
                                    return "\u256D" /* dr */;
                                case 7 /* UpDownLeft */:
                                    return "\u2524" /* udl */;
                                case 11 /* UpDownRight */:
                                    return "\u251C" /* udr */;
                                case 13 /* UpLeftRight */:
                                    return "\u2534" /* ulr */;
                                case 14 /* DownLeftRight */:
                                    return "\u252C" /* dlr */;
                                case 15 /* UpDownLeftRight */:
                                    return "\u256B" /* udlr */;
                            }
                            return " ";
                        }
                        function fill(array, value) {
                            if (array.fill) {
                                array.fill(value);
                            }
                            else {
                                for (let i = 0; i < array.length; i++) {
                                    array[i] = value;
                                }
                            }
                            return array;
                        }
                        function repeat(ch, length2) {
                            if (ch.repeat) {
                                return length2 > 0 ? ch.repeat(length2) : "";
                            }
                            let s = "";
                            while (s.length < length2) {
                                s += ch;
                            }
                            return s;
                        }
                    }