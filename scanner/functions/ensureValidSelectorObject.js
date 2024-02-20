function ensureValidSelectorObject(selector) {
        if (selector != null && (typeof selector != 'object' || Buffer.isBuffer(selector))) {
            return {};
        }
        return selector;
    }