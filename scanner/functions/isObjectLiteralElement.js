function isObjectLiteralElement(node) {
            return node.kind === 288 /* JsxAttribute */ || node.kind === 290 /* JsxSpreadAttribute */ || isObjectLiteralElementLike(node);
        }