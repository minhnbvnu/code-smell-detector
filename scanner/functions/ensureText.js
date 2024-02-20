function ensureText(textOrSourceCode) {
        if (typeof textOrSourceCode === "object") {
            const { hasBOM, text } = textOrSourceCode;
            const bom = hasBOM ? "\uFEFF" : "";
            return bom + text;
        }
        return String(textOrSourceCode);
    }