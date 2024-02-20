function parseJSDocTypeExpression(mayOmitBraces) {
                            const pos = getNodePos();
                            const hasBrace = (mayOmitBraces ? parseOptional : parseExpected)(18 /* OpenBraceToken */);
                            const type = doInsideOfContext(8388608 /* JSDoc */, parseJSDocType);
                            if (!mayOmitBraces || hasBrace) {
                                parseExpectedJSDoc(19 /* CloseBraceToken */);
                            }
                            const result = factory2.createJSDocTypeExpression(type);
                            fixupParentReferences(result);
                            return finishNode(result, pos);
                        }