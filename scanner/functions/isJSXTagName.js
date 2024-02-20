function isJSXTagName(node) {
            const { parent: parent2 } = node;
            if (parent2.kind === 283 /* JsxOpeningElement */ || parent2.kind === 282 /* JsxSelfClosingElement */ || parent2.kind === 284 /* JsxClosingElement */) {
                return parent2.tagName === node;
            }
            return false;
        }