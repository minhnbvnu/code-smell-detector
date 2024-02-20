function TreeProcessor(attrs) {
        const tree = attrs.tree;
        const runnableIds = attrs.runnableIds;
        const queueRunnerFactory = attrs.queueRunnerFactory;
        const nodeStart = attrs.nodeStart || function () {};
        const nodeComplete = attrs.nodeComplete || function () {};
        const orderChildren = attrs.orderChildren || function (node) { return node.children; };
        let stats = { valid: true };
        let processed = false;
        const defaultMin = Infinity;
        const defaultMax = 1 - Infinity;

        this.processTree = function () {
            processNode(tree, false);
            processed = true;
            return stats;
        };

        this.execute = function (done) {
            if (!processed) {
                this.processTree();
            }

            if (!stats.valid) {
                throw 'invalid order';
            }

            const childFns = wrapChildren(tree, 0);

            queueRunnerFactory({
                queueableFns: childFns,
                userContext: tree.sharedUserContext(),
                onException() {
                    tree.onException.apply(tree, arguments);
                },
                onComplete: done
            });
        };

        function runnableIndex(id) {
            for (let i = 0; i < runnableIds.length; i++) {
                if (runnableIds[i] === id) {
                    return i;
                }
            }
        }

        function processNode(node, parentEnabled) {
            const executableIndex = runnableIndex(node.id);

            if (executableIndex !== undefined) {
                parentEnabled = true;
            }

            parentEnabled = parentEnabled && node.isExecutable();

            if (!node.children) {
                stats[node.id] = {
                    executable: parentEnabled && node.isExecutable(),
                    segments: [{
                        index: 0,
                        owner: node,
                        nodes: [node],
                        min: startingMin(executableIndex),
                        max: startingMax(executableIndex)
                    }]
                };
            } else {
                let hasExecutableChild = false;

                const orderedChildren = orderChildren(node);

                for (let i = 0; i < orderedChildren.length; i++) {
                    const child = orderedChildren[i];

                    processNode(child, parentEnabled);

                    if (!stats.valid) {
                        return;
                    }

                    const childStats = stats[child.id];

                    hasExecutableChild = hasExecutableChild || childStats.executable;
                }

                stats[node.id] = {
                    executable: hasExecutableChild
                };

                segmentChildren(node, orderedChildren, stats[node.id], executableIndex);

                if (!node.canBeReentered() && stats[node.id].segments.length > 1) {
                    stats = { valid: false };
                }
            }
        }

        function startingMin(executableIndex) {
            return executableIndex === undefined ? defaultMin : executableIndex;
        }

        function startingMax(executableIndex) {
            return executableIndex === undefined ? defaultMax : executableIndex;
        }

        function segmentChildren(node, orderedChildren, nodeStats, executableIndex) {
            let currentSegment = {
                index: 0, owner: node, nodes: [], min: startingMin(executableIndex), max: startingMax(executableIndex)
            };
            const result = [currentSegment];
            let lastMax = defaultMax;
            const orderedChildSegments = orderChildSegments(orderedChildren);

            function isSegmentBoundary(minIndex) {
                return lastMax !== defaultMax && minIndex !== defaultMin && lastMax < minIndex - 1;
            }

            for (let i = 0; i < orderedChildSegments.length; i++) {
                const childSegment = orderedChildSegments[i];
                const maxIndex = childSegment.max;
                const minIndex = childSegment.min;

                if (isSegmentBoundary(minIndex)) {
                    currentSegment = {
                        index: result.length, owner: node, nodes: [], min: defaultMin, max: defaultMax
                    };
                    result.push(currentSegment);
                }

                currentSegment.nodes.push(childSegment);
                currentSegment.min = Math.min(currentSegment.min, minIndex);
                currentSegment.max = Math.max(currentSegment.max, maxIndex);
                lastMax = maxIndex;
            }

            nodeStats.segments = result;
        }

        function orderChildSegments(children) {
            const specifiedOrder = [];
            const unspecifiedOrder = [];

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                const segments = stats[child.id].segments;

                for (let j = 0; j < segments.length; j++) {
                    const seg = segments[j];

                    if (seg.min === defaultMin) {
                        unspecifiedOrder.push(seg);
                    } else {
                        specifiedOrder.push(seg);
                    }
                }
            }

            specifiedOrder.sort((a, b) => a.min - b.min);

            return specifiedOrder.concat(unspecifiedOrder);
        }

        function executeNode(node, segmentNumber) {
            if (node.children) {
                return {
                    fn(done) {
                        nodeStart(node);

                        queueRunnerFactory({
                            onComplete() {
                                nodeComplete(node, node.getResult());
                                done();
                            },
                            queueableFns: wrapChildren(node, segmentNumber),
                            userContext: node.sharedUserContext(),
                            onException() {
                                node.onException.apply(node, arguments);
                            }
                        });
                    }
                };
            }
            return {
                fn(done) { node.execute(done, stats[node.id].executable); }
            };
        }

        function wrapChildren(node, segmentNumber) {
            const result = [];
            const segmentChildren = stats[node.id].segments[segmentNumber].nodes;

            for (let i = 0; i < segmentChildren.length; i++) {
                result.push(executeNode(segmentChildren[i].owner, segmentChildren[i].index));
            }

            if (!stats[node.id].executable) {
                return result;
            }

            return node.beforeAllFns.concat(result).concat(node.afterAllFns);
        }
    }