function identifierToKeywordKind(node) {
            const token = stringToToken(node.escapedText);
            return token ? tryCast(token, isKeyword) : void 0;
        }