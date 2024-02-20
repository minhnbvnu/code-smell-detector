function emitBindingElement(node) {
                emit(node.dotDotDotToken);
                if (node.propertyName) {
                    emit(node.propertyName);
                    writePunctuation(":");
                    writeSpace();
                }
                emit(node.name);
                emitInitializer(node.initializer, node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
            }