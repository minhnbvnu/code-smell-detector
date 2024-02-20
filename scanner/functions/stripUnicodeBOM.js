function stripUnicodeBOM(text) {
        /*
         * Check Unicode BOM.
         * In JavaScript, string data is stored as UTF-16, so BOM is 0xFEFF.
         * http://www.ecma-international.org/ecma-262/6.0/#sec-unicode-format-control-characters
         */
        if (text.charCodeAt(0) === 0xFEFF) {
            return text.slice(1);
        }
        return text;
    }