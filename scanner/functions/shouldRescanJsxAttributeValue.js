function shouldRescanJsxAttributeValue(node) {
                return node.parent && isJsxAttribute(node.parent) && node.parent.initializer === node;
            }