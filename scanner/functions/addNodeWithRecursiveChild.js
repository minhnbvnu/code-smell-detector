function addNodeWithRecursiveChild(node, child, name) {
            startNode(node, name);
            addChildrenRecursively(child);
            endNode();
        }