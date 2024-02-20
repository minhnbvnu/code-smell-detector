function isNamedImportsOrExports(node) {
            return node.kind === 272 /* NamedImports */ || node.kind === 276 /* NamedExports */;
        }