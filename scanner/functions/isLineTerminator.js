function isLineTerminator(code) {
        return (code === LINE_FEED ||
            code === CARRIAGE_RETURN ||
            code === LINE_SEPARATOR ||
            code === PARAGRAPH_SEPARATOR);
    }