function isNamedExportBindings(node) {
            return node.kind === 277 /* NamespaceExport */ || node.kind === 276 /* NamedExports */;
        }