function checkMetaProperty(node, metaName, propertyName) {
        return node.meta.name === metaName && node.property.name === propertyName;
    }