function tryClassifyNode(node) {
                if (isJSDoc(node)) {
                    return true;
                }
                if (nodeIsMissing(node)) {
                    return true;
                }
                const classifiedElementName = tryClassifyJsxElementName(node);
                if (!isToken(node) && node.kind !== 11 /* JsxText */ && classifiedElementName === void 0) {
                    return false;
                }
                const tokenStart = node.kind === 11 /* JsxText */ ? node.pos : classifyLeadingTriviaAndGetTokenStart(node);
                const tokenWidth = node.end - tokenStart;
                Debug.assert(tokenWidth >= 0);
                if (tokenWidth > 0) {
                    const type = classifiedElementName || classifyTokenType(node.kind, node);
                    if (type) {
                        pushClassification(tokenStart, tokenWidth, type);
                    }
                }
                return true;
            }