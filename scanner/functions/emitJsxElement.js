function emitJsxElement(node) {
                emit(node.openingElement);
                emitList(node, node.children, 262144 /* JsxElementOrFragmentChildren */);
                emit(node.closingElement);
            }