function isMemberName(node) {
            return node.kind === 79 /* Identifier */ || node.kind === 80 /* PrivateIdentifier */;
        }