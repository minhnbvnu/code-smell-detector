function pushSymbolKind(symbolKind2) {
                switch (symbolKind2) {
                    case "var" /* variableElement */:
                    case "function" /* functionElement */:
                    case "let" /* letElement */:
                    case "const" /* constElement */:
                    case "constructor" /* constructorImplementationElement */:
                        displayParts.push(textOrKeywordPart(symbolKind2));
                        return;
                    default:
                        displayParts.push(punctuationPart(20 /* OpenParenToken */));
                        displayParts.push(textOrKeywordPart(symbolKind2));
                        displayParts.push(punctuationPart(21 /* CloseParenToken */));
                        return;
                }
            }