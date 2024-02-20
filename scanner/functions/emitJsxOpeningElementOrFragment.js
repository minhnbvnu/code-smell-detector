function emitJsxOpeningElementOrFragment(node) {
                writePunctuation("<");
                if (isJsxOpeningElement(node)) {
                    const indented = writeLineSeparatorsAndIndentBefore(node.tagName, node);
                    emitJsxTagName(node.tagName);
                    emitTypeArguments(node, node.typeArguments);
                    if (node.attributes.properties && node.attributes.properties.length > 0) {
                        writeSpace();
                    }
                    emit(node.attributes);
                    writeLineSeparatorsAfter(node.attributes, node);
                    decreaseIndentIf(indented);
                }
                writePunctuation(">");
            }