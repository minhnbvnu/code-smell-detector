function parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext) {
                        const pos = getNodePos();
                        parseExpected(29 /* LessThanToken */);
                        if (token() === 31 /* GreaterThanToken */) {
                            scanJsxText();
                            return finishNode(factory2.createJsxOpeningFragment(), pos);
                        }
                        const tagName = parseJsxElementName();
                        const typeArguments = (contextFlags & 262144 /* JavaScriptFile */) === 0 ? tryParseTypeArguments() : void 0;
                        const attributes = parseJsxAttributes();
                        let node;
                        if (token() === 31 /* GreaterThanToken */) {
                            scanJsxText();
                            node = factory2.createJsxOpeningElement(tagName, typeArguments, attributes);
                        }
                        else {
                            parseExpected(43 /* SlashToken */);
                            if (parseExpected(31 /* GreaterThanToken */, 
                            /*diagnostic*/
                            void 0, 
                            /*shouldAdvance*/
                            false)) {
                                if (inExpressionContext) {
                                    nextToken();
                                }
                                else {
                                    scanJsxText();
                                }
                            }
                            node = factory2.createJsxSelfClosingElement(tagName, typeArguments, attributes);
                        }
                        return finishNode(node, pos);
                    }