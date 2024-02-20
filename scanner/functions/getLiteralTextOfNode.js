function getLiteralTextOfNode(node, neverAsciiEscape, jsxAttributeEscape) {
                if (node.kind === 10 /* StringLiteral */ && node.textSourceNode) {
                    const textSourceNode = node.textSourceNode;
                    if (isIdentifier(textSourceNode) || isPrivateIdentifier(textSourceNode) || isNumericLiteral(textSourceNode)) {
                        const text = isNumericLiteral(textSourceNode) ? textSourceNode.text : getTextOfNode2(textSourceNode);
                        return jsxAttributeEscape ? `"${escapeJsxAttributeString(text)}"` : neverAsciiEscape || getEmitFlags(node) & 33554432 /* NoAsciiEscaping */ ? `"${escapeString(text)}"` : `"${escapeNonAsciiString(text)}"`;
                    }
                    else {
                        return getLiteralTextOfNode(textSourceNode, neverAsciiEscape, jsxAttributeEscape);
                    }
                }
                const flags = (neverAsciiEscape ? 1 /* NeverAsciiEscape */ : 0) | (jsxAttributeEscape ? 2 /* JsxAttributeEscape */ : 0) | (printerOptions.terminateUnterminatedLiterals ? 4 /* TerminateUnterminatedLiterals */ : 0) | (printerOptions.target && printerOptions.target === 99 /* ESNext */ ? 8 /* AllowNumericSeparator */ : 0);
                return getLiteralText(node, currentSourceFile, flags);
            }