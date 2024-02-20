function emitRestOrJSDocVariadicType(node) {
                writePunctuation("...");
                emit(node.type);
            }