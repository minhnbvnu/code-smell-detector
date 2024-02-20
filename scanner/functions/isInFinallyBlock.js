function isInFinallyBlock(node, label) {
                let labelInside = false;
                let sentinelNodeType;
                if (node.type === "BreakStatement" && !node.label) {
                    sentinelNodeType = SENTINEL_NODE_TYPE_BREAK;
                }
                else if (node.type === "ContinueStatement") {
                    sentinelNodeType = SENTINEL_NODE_TYPE_CONTINUE;
                }
                else {
                    sentinelNodeType = SENTINEL_NODE_TYPE_RETURN_THROW;
                }
                for (let currentNode = node; currentNode && !sentinelNodeType.test(currentNode.type); currentNode = currentNode.parent) {
                    if (currentNode.parent.label && label && (currentNode.parent.label.name === label.name)) {
                        labelInside = true;
                    }
                    if (isFinallyBlock(currentNode)) {
                        if (label && labelInside) {
                            return false;
                        }
                        return true;
                    }
                }
                return false;
            }