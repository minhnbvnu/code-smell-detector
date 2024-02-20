function isReservedPrivateName(node) {
            return !isGeneratedPrivateIdentifier(node) && node.escapedText === "#constructor";
        }