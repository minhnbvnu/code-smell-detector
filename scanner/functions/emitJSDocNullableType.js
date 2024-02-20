function emitJSDocNullableType(node) {
                writePunctuation("?");
                emit(node.type);
            }