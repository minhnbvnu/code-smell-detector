function assertNotDetached(range) {
        if (!range.startContainer) {
            throw new DOMException("INVALID_STATE_ERR");
        }
    }