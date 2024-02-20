function emitArrayType(node) {
                emit(node.elementType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
                writePunctuation("[");
                writePunctuation("]");
            }