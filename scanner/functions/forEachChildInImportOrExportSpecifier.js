function forEachChildInImportOrExportSpecifier(node, cbNode, _cbNodes) {
            return visitNode2(cbNode, node.propertyName) || visitNode2(cbNode, node.name);
        }