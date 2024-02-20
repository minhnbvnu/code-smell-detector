function removeDuplicateSlashes(pattern) {
        return pattern.replace(DOUBLE_SLASH_RE, '/');
    }