function isPushOrUnshiftIdentifier(node) {
            return node.escapedText === "push" || node.escapedText === "unshift";
        }