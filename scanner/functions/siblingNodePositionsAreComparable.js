function siblingNodePositionsAreComparable(previousNode, nextNode) {
                if (nextNode.pos < previousNode.end) {
                    return false;
                }
                previousNode = getOriginalNode(previousNode);
                nextNode = getOriginalNode(nextNode);
                const parent2 = previousNode.parent;
                if (!parent2 || parent2 !== nextNode.parent) {
                    return false;
                }
                const parentNodeArray = getContainingNodeArray(previousNode);
                const prevNodeIndex = parentNodeArray == null ? void 0 : parentNodeArray.indexOf(previousNode);
                return prevNodeIndex !== void 0 && prevNodeIndex > -1 && parentNodeArray.indexOf(nextNode) === prevNodeIndex + 1;
            }