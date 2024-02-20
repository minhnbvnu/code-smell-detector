function parseJsxAttribute() {
                        if (token() === 18 /* OpenBraceToken */) {
                            return parseJsxSpreadAttribute();
                        }
                        scanJsxIdentifier();
                        const pos = getNodePos();
                        return finishNode(factory2.createJsxAttribute(parseIdentifierName(), parseJsxAttributeValue()), pos);
                    }