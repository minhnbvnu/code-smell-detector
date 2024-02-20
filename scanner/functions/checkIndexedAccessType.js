function checkIndexedAccessType(node) {
                checkSourceElement(node.objectType);
                checkSourceElement(node.indexType);
                checkIndexedAccessIndexType(getTypeFromIndexedAccessTypeNode(node), node);
            }