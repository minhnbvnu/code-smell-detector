function textOrKeywordPart(text) {
            const kind = stringToToken(text);
            return kind === void 0 ? textPart(text) : keywordPart(kind);
        }