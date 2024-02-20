function updateIndexedAccessTypeNode(node, objectType, indexType) {
                return node.objectType !== objectType || node.indexType !== indexType ? update(createIndexedAccessTypeNode(objectType, indexType), node) : node;
            }