function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }