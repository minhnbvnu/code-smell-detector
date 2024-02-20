function checkJsxSelfClosingElement(node, _checkMode) {
                checkNodeDeferred(node);
                return getJsxElementTypeAt(node) || anyType;
            }