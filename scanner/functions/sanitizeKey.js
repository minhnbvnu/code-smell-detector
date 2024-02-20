function sanitizeKey(key) {
        if (key === '__proto__')
            return '___proto___';
        return key;
    }