function isArrayIndexAccess(node) {
                return Number.isInteger(node.property.value);
            }