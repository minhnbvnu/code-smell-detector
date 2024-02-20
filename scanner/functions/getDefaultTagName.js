function getDefaultTagName(node) {
                const defaultTagName = getDefaultTagNameForKind(node.kind);
                return node.tagName.escapedText === escapeLeadingUnderscores(defaultTagName) ? node.tagName : createIdentifier(defaultTagName);
            }