function symbolNameNoDefault(symbol) {
            const escaped = symbolEscapedNameNoDefault(symbol);
            return escaped === void 0 ? void 0 : unescapeLeadingUnderscores(escaped);
        }