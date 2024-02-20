function isNodeDescendantOf(node, ancestor) {
            while (node) {
                if (node === ancestor)
                    return true;
                node = node.parent;
            }
            return false;
        }