function naiveHasReturn(node) {
                if (node.type === "BlockStatement") {
                    const body = node.body, lastChildNode = body[body.length - 1];
                    return lastChildNode && checkForReturn(lastChildNode);
                }
                return checkForReturn(node);
            }