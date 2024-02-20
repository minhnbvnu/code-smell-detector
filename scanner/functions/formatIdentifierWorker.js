function formatIdentifierWorker(node, generateName) {
            return isGeneratedPrivateIdentifier(node) ? generateName(node).slice(1) : isGeneratedIdentifier(node) ? generateName(node) : isPrivateIdentifier(node) ? node.escapedText.slice(1) : idText(node);
        }