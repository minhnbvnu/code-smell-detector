function firstVisibleChild(node) {
    for (let i = 0; i < node.children.length; ++i) {
        if (window.getComputedStyle(node.children[i]).display !== 'none') {
            return node.children[i];
        }
    }
}