function insertAfterElement(refEl, content) {
        var newEls = normalizeContent(content);
        var afterEl = refEl.nextSibling || null;
        for (var i = 0; i < newEls.length; i++) {
            refEl.parentNode.insertBefore(newEls[i], afterEl);
        }
    }