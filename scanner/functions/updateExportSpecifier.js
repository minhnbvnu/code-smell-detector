function updateExportSpecifier(node, isTypeOnly, propertyName, name) {
                return node.isTypeOnly !== isTypeOnly || node.propertyName !== propertyName || node.name !== name ? update(createExportSpecifier(isTypeOnly, propertyName, name), node) : node;
            }