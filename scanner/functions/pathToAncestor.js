function pathToAncestor(node, ancestor) {
                const path = [node];
                let currentNode = node;
                while (currentNode !== ancestor) {
                    currentNode = currentNode.parent;
                    /* c8 ignore start */
                    if (currentNode === null) {
                        throw new Error("Nodes are not in the ancestor-descendant relationship.");
                    } /* c8 ignore stop */
                    path.push(currentNode);
                }
                return path;
            }