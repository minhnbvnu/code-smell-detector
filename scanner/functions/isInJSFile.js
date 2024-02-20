function isInJSFile(node) {
            return !!node && !!(node.flags & 262144 /* JavaScriptFile */);
        }