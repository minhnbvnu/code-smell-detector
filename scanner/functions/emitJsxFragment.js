function emitJsxFragment(node) {
                emit(node.openingFragment);
                emitList(node, node.children, 262144 /* JsxElementOrFragmentChildren */);
                emit(node.closingFragment);
            }