function getNodeById(root, id) {
        var node;
        if (root.type == 'element' && root.getAttr('id') == id) {
            return root;
        }
        if (root.children && root.children.length) {
            for (var i = 0, ci; ci = root.children[i++];) {
                if (node = getNodeById(ci, id)) {
                    return node;
                }
            }
        }
    }