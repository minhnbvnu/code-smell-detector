function htmlToElements(html) {
        return Array.prototype.slice.call(htmlToNodeList(html));
    }