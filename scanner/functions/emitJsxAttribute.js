function emitJsxAttribute(node) {
                emit(node.name);
                emitNodeWithPrefix("=", writePunctuation, node.initializer, emitJsxAttributeValue);
            }