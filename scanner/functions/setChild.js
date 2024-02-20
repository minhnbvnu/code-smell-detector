function setChild(node, position, child) {
            var children = node.childNodes;
            children[position] = child;
            if (child) {
                child.parent = node;
            }
        }