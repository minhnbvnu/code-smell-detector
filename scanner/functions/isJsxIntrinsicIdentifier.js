function isJsxIntrinsicIdentifier(tagName) {
                return tagName.kind === 79 /* Identifier */ && isIntrinsicJsxName(tagName.escapedText);
            }