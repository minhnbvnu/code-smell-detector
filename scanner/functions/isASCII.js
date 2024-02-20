function isASCII(value) {
        return /^[\u0020-\u007f]*$/u.test(value);
    }