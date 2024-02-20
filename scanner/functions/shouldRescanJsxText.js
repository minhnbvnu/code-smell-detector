function shouldRescanJsxText(node) {
                return isJsxText(node) || isJsxElement(node) && (lastTokenInfo == null ? void 0 : lastTokenInfo.token.kind) === 11 /* JsxText */;
            }