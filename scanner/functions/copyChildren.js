function copyChildren(oldNode, newNode) {
            var children = oldNode.childNodes;
            for (var i = 0; i < children.length; i++) {
                setChild(newNode, i, children[i]);
            }
        }