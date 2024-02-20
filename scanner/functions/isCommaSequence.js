function isCommaSequence(node) {
            return isCommaExpression(node) || isCommaListExpression(node);
        }