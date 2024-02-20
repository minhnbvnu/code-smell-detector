function isESSymbolIdentifier(node) {
            return node.kind === 79 /* Identifier */ && node.escapedText === "Symbol";
        }