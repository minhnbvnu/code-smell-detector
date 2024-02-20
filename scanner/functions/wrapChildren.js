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