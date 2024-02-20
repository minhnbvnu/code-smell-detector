function isRenamedImport(node) {
        const parent = node.parent;
        return ((parent.type === "ImportSpecifier" &&
            parent.imported !== parent.local &&
            parent.imported === node) ||
            (parent.type === "ExportSpecifier" &&
                parent.parent.source && // re-export
                parent.local !== parent.exported &&
                parent.local === node));
    }