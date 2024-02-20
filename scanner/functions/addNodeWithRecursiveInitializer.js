function addNodeWithRecursiveInitializer(node) {
            if (node.initializer && isFunctionOrClassExpression(node.initializer)) {
                startNode(node);
                forEachChild(node.initializer, addChildrenRecursively);
                endNode();
            }
            else {
                addNodeWithRecursiveChild(node, node.initializer);
            }
        }