function updateImportSpecifier(node, isTypeOnly, propertyName, name) {
                return node.isTypeOnly !== isTypeOnly || node.propertyName !== propertyName || node.name !== name ? update(createImportSpecifier(isTypeOnly, propertyName, name), node) : node;
            }