function emitMetaProperty(node) {
                writeToken(node.keywordToken, node.pos, writePunctuation);
                writePunctuation(".");
                emit(node.name);
            }