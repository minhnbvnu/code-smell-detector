function isExportsIdentifier(node) {
            return isIdentifier(node) && node.escapedText === "exports";
        }