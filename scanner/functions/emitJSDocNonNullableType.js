function emitJSDocNonNullableType(node) {
                writePunctuation("!");
                emit(node.type);
            }