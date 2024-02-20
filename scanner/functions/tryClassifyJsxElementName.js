function tryClassifyJsxElementName(token) {
                switch (token.parent && token.parent.kind) {
                    case 283 /* JsxOpeningElement */:
                        if (token.parent.tagName === token) {
                            return 19 /* jsxOpenTagName */;
                        }
                        break;
                    case 284 /* JsxClosingElement */:
                        if (token.parent.tagName === token) {
                            return 20 /* jsxCloseTagName */;
                        }
                        break;
                    case 282 /* JsxSelfClosingElement */:
                        if (token.parent.tagName === token) {
                            return 21 /* jsxSelfClosingTagName */;
                        }
                        break;
                    case 288 /* JsxAttribute */:
                        if (token.parent.name === token) {
                            return 22 /* jsxAttribute */;
                        }
                        break;
                }
                return void 0;
            }