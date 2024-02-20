function shouldRescanJsxIdentifier(node) {
                if (node.parent) {
                    switch (node.parent.kind) {
                        case 288 /* JsxAttribute */:
                        case 283 /* JsxOpeningElement */:
                        case 284 /* JsxClosingElement */:
                        case 282 /* JsxSelfClosingElement */:
                            return isKeyword(node.kind) || node.kind === 79 /* Identifier */;
                    }
                }
                return false;
            }