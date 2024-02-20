function prependToElement(parent, content) {
        var newEls = normalizeContent(content);
        var afterEl = parent.firstChild || null; // if no firstChild, will append to end, but that's okay, b/c there were no children
        for (var i = 0; i < newEls.length; i++) {
            parent.insertBefore(newEls[i], afterEl);
        }
    }