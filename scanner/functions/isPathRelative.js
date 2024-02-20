function isPathRelative(path) {
        return !/^(?:[a-z-]+:|\/|#)/i.test(path);
    }