function walkTreeForImportMeta(node) {
            return isImportMeta2(node) ? node : forEachChild(node, walkTreeForImportMeta);
        }