function parseJsxChildren(openingTag) {
                        const list = [];
                        const listPos = getNodePos();
                        const saveParsingContext = parsingContext;
                        parsingContext |= 1 << 14 /* JsxChildren */;
                        while (true) {
                            const child = parseJsxChild(openingTag, currentToken = scanner2.reScanJsxToken());
                            if (!child)
                                break;
                            list.push(child);
                            if (isJsxOpeningElement(openingTag) && (child == null ? void 0 : child.kind) === 281 /* JsxElement */ && !tagNamesAreEquivalent(child.openingElement.tagName, child.closingElement.tagName) && tagNamesAreEquivalent(openingTag.tagName, child.closingElement.tagName)) {
                                break;
                            }
                        }
                        parsingContext = saveParsingContext;
                        return createNodeArray(list, listPos);
                    }