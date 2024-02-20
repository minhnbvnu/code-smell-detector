function emitLiteral(node, jsxAttributeEscape) {
                const text = getLiteralTextOfNode(node, printerOptions.neverAsciiEscape, jsxAttributeEscape);
                if ((printerOptions.sourceMap || printerOptions.inlineSourceMap) && (node.kind === 10 /* StringLiteral */ || isTemplateLiteralKind(node.kind))) {
                    writeLiteral(text);
                }
                else {
                    writeStringLiteral(text);
                }
            }