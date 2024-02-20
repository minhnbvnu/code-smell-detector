function emitIndexedAccessType(node) {
                emit(node.objectType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
                writePunctuation("[");
                emit(node.indexType);
                writePunctuation("]");
            }