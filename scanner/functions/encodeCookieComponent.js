function encodeCookieComponent(str) {
        return str.toString().replace(EXCLUDED_CHARS, encodeURIComponent);
    }