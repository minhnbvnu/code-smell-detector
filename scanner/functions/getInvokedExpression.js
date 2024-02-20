function getInvokedExpression(node) {
            switch (node.kind) {
                case 212 /* TaggedTemplateExpression */:
                    return node.tag;
                case 283 /* JsxOpeningElement */:
                case 282 /* JsxSelfClosingElement */:
                    return node.tagName;
                default:
                    return node.expression;
            }
        }