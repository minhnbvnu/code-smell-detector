function emitJsxClosingElementOrFragment(node) {
                writePunctuation("</");
                if (isJsxClosingElement(node)) {
                    emitJsxTagName(node.tagName);
                }
                writePunctuation(">");
            }