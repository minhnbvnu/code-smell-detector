function parseJsxClosingFragment(inExpressionContext) {
                        const pos = getNodePos();
                        parseExpected(30 /* LessThanSlashToken */);
                        if (parseExpected(31 /* GreaterThanToken */, Diagnostics.Expected_corresponding_closing_tag_for_JSX_fragment, 
                        /*shouldAdvance*/
                        false)) {
                            if (inExpressionContext) {
                                nextToken();
                            }
                            else {
                                scanJsxText();
                            }
                        }
                        return finishNode(factory2.createJsxJsxClosingFragment(), pos);
                    }