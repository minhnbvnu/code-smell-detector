function getIntrinsicAttributesTypeFromJsxOpeningLikeElement(node) {
                Debug.assert(isJsxIntrinsicIdentifier(node.tagName));
                const links = getNodeLinks(node);
                if (!links.resolvedJsxElementAttributesType) {
                    const symbol = getIntrinsicTagSymbol(node);
                    if (links.jsxFlags & 1 /* IntrinsicNamedElement */) {
                        return links.resolvedJsxElementAttributesType = getTypeOfSymbol(symbol) || errorType;
                    }
                    else if (links.jsxFlags & 2 /* IntrinsicIndexedElement */) {
                        return links.resolvedJsxElementAttributesType = getIndexTypeOfType(getJsxType(JsxNames.IntrinsicElements, node), stringType) || errorType;
                    }
                    else {
                        return links.resolvedJsxElementAttributesType = errorType;
                    }
                }
                return links.resolvedJsxElementAttributesType;
            }