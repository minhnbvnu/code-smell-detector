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