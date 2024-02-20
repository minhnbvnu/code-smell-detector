function _decode(header) {
        return JSON.parse(atob(header));
    }