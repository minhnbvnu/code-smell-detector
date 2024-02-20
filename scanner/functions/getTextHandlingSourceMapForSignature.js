function getTextHandlingSourceMapForSignature(text, data) {
            return (data == null ? void 0 : data.sourceMapUrlPos) !== void 0 ? text.substring(0, data.sourceMapUrlPos) : text;
        }