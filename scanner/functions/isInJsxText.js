function isInJsxText(contextToken2) {
                if (contextToken2.kind === 11 /* JsxText */) {
                    return true;
                }
                if (contextToken2.kind === 31 /* GreaterThanToken */ && contextToken2.parent) {
                    if (location === contextToken2.parent && (location.kind === 283 /* JsxOpeningElement */ || location.kind === 282 /* JsxSelfClosingElement */)) {
                        return false;
                    }
                    if (contextToken2.parent.kind === 283 /* JsxOpeningElement */) {
                        return location.parent.kind !== 283 /* JsxOpeningElement */;
                    }
                    if (contextToken2.parent.kind === 284 /* JsxClosingElement */ || contextToken2.parent.kind === 282 /* JsxSelfClosingElement */) {
                        return !!contextToken2.parent.parent && contextToken2.parent.parent.kind === 281 /* JsxElement */;
                    }
                }
                return false;
            }