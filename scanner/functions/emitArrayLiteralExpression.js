function emitArrayLiteralExpression(node) {
                const elements = node.elements;
                const preferNewLine = node.multiLine ? 65536 /* PreferNewLine */ : 0 /* None */;
                emitExpressionList(node, elements, 8914 /* ArrayLiteralExpressionElements */ | preferNewLine, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }