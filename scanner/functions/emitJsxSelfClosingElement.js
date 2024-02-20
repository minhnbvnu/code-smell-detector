function emitJsxSelfClosingElement(node) {
                writePunctuation("<");
                emitJsxTagName(node.tagName);
                emitTypeArguments(node, node.typeArguments);
                writeSpace();
                emit(node.attributes);
                writePunctuation("/>");
            }