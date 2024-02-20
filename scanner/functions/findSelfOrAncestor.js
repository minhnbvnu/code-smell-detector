function findSelfOrAncestor(node, match) {
                let currentNode = node;
                while (currentNode && !match(currentNode)) {
                    currentNode = currentNode.parent;
                }
                return currentNode;
            }