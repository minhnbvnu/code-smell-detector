function canHaveIllegalModifiers(node) {
            const kind = node.kind;
            return kind === 172 /* ClassStaticBlockDeclaration */ || kind === 299 /* PropertyAssignment */ || kind === 300 /* ShorthandPropertyAssignment */ || kind === 279 /* MissingDeclaration */ || kind === 267 /* NamespaceExportDeclaration */;
        }