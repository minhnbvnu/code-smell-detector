function getEscapedTextOfIdentifierOrLiteral(node) {
            return isMemberName(node) ? node.escapedText : escapeLeadingUnderscores(node.text);
        }