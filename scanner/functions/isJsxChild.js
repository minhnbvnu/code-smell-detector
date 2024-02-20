function isJsxChild(node) {
            const kind = node.kind;
            return kind === 281 /* JsxElement */ || kind === 291 /* JsxExpression */ || kind === 282 /* JsxSelfClosingElement */ || kind === 11 /* JsxText */ || kind === 285 /* JsxFragment */;
        }