function isFullObject(payload) {
        return isPlainObject(payload) && Object.keys(payload).length > 0;
    }