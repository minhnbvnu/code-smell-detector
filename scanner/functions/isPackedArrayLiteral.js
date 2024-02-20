function isPackedArrayLiteral(node) {
            return isArrayLiteralExpression(node) && every(node.elements, isPackedElement);
        }