function parseLiteralOfTemplateSpan(isTaggedTemplate) {
                        if (token() === 19 /* CloseBraceToken */) {
                            reScanTemplateToken(isTaggedTemplate);
                            return parseTemplateMiddleOrTemplateTail();
                        }
                        else {
                            return parseExpectedToken(17 /* TemplateTail */, Diagnostics._0_expected, tokenToString(19 /* CloseBraceToken */));
                        }
                    }