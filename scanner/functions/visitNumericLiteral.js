function visitNumericLiteral(node) {
                if (node.numericLiteralFlags & 384 /* BinaryOrOctalSpecifier */) {
                    return setTextRange(factory2.createNumericLiteral(node.text), node);
                }
                return node;
            }