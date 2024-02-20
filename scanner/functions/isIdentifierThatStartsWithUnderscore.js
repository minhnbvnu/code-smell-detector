function isIdentifierThatStartsWithUnderscore(node) {
                return isIdentifier(node) && idText(node).charCodeAt(0) === 95 /* _ */;
            }