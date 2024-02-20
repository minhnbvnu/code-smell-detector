function isEscaped(str, index) {
        let escaped = false;
        for (let i = index - 1; i >= 0 && str.charCodeAt(i) === 0x5c; --i) {
            escaped = !escaped;
        }
        return escaped;
    }