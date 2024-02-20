function namespaceHasExportStatement(ns) {
        if (ns.body === undefined || ns.body.kind !== ts.SyntaxKind.ModuleBlock)
            return false;
        return containsExportStatement(ns.body);
    }