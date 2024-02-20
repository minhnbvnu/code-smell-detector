function isNonJsxTextContext(context) {
            return context.contextNode.kind !== 11 /* JsxText */;
        }