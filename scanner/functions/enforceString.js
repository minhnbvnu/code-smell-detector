function enforceString(code) {
        if (typeof code !== 'string') {
            return String(code);
        }
        return code;
    }