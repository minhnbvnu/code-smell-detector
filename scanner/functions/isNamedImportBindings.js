function isNamedImportBindings(node) {
            const kind = node.kind;
            return kind === 272 /* NamedImports */ || kind === 271 /* NamespaceImport */;
        }