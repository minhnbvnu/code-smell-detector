function emitJSDocNameReference(node) {
                writeSpace();
                writePunctuation("{");
                emit(node.name);
                writePunctuation("}");
            }