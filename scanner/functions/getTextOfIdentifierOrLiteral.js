function getTextOfIdentifierOrLiteral(node) {
            return isMemberName(node) ? idText(node) : node.text;
        }