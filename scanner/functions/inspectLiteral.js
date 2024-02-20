function inspectLiteral(emitted) {
            const node = emitted.node, nodeText = sourceCode.getText(node);

            if (emitted.exit || typeof node.value !== "string" ||
                (nodeText [0] !== "'" && nodeText [0] !== "\"" && isHex(node.value))) {
                return;
            }

            if (!selectedQuoteStyleLiteralRegExp.test(nodeText)) {
                const errorObject = {
                    node,
                    fix(fixer) {
                        const fixedString = quote + jsStringEscape(node.value) + quote,
                            currentQuote = (quote === "'" ? "\"" : "'");
                        const openingQuoteI = nodeText.indexOf(currentQuote),
                            closingQuoteI = nodeText.lastIndexOf(currentQuote);
                        const fixedNodeText = nodeText.slice(0, openingQuoteI) + fixedString + nodeText.slice(closingQuoteI+1);

                        return fixer.replaceText(node, fixedNodeText);
                    },
                    message: `String literal must be quoted with ${quoteStyle} quotes.`
                };

                context.report(errorObject);
            }
        }