function emitOptionalType(node) {
                emit(node.type, parenthesizer.parenthesizeTypeOfOptionalType);
                writePunctuation("?");
            }