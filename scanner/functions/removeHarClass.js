function removeHarClass(node) {
        var className = node.className.replace(re, " ");
        node.className = className.replace(/^\s*|\s*$/g, "");
    }