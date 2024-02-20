function emitParenthesizedType(node) {
                writePunctuation("(");
                emit(node.type);
                writePunctuation(")");
            }