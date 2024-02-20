function isTypeKeywordTokenOrIdentifier(node) {
            return isTypeKeywordToken(node) || isIdentifier(node) && node.text === "type";
        }