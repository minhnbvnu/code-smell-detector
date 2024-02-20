function getNodesByTagName(node, tagName, arr) {
        if (node.type == 'element' && node.tagName == tagName) {
            arr.push(node);
        }
        if (node.children && node.children.length) {
            for (var i = 0, ci; ci = node.children[i++];) {
                getNodesByTagName(ci, tagName, arr)
            }
        }
    }