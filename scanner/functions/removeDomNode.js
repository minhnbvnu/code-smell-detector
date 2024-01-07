function removeDomNode(node) {
    if (!node) {
        return this;
    }
    if (Browser.ielt9 || Browser.ie9) {
        //fix memory leak in IE9-
        //http://com.hemiola.com/2009/11/23/memory-leaks-in-ie8/
        let d = createEl('div');
        d.appendChild(node);
        d.innerHTML = '';
        d = null;
    } else if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
    return this;
}