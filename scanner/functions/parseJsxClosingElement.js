function parseJsxClosingElement(open, inExpressionContext) {
                        const pos = getNodePos();
                        parseExpected(30 /* LessThanSlashToken */);
                        const tagName = parseJsxElementName();
                        if (parseExpected(31 /* GreaterThanToken */, 
                        /*diagnostic*/
                        void 0, 
                        /*shouldAdvance*/
                        false)) {
                            if (inExpressionContext || !tagNamesAreEquivalent(open.tagName, tagName)) {
                                nextToken();
                            }
                            else {
                                scanJsxText();
                            }
                        }
                        return finishNode(factory2.createJsxClosingElement(tagName), pos);
                    }