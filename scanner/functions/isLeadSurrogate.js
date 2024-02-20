function isLeadSurrogate(code) {
        return code >= 0xd800 && code <= 0xdbff;
    }